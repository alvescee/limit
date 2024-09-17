import {elements, map} from "./index.js";

let allLayer = [];

export default function addArea (area) {

    const control = elements.control();
    const id = area.id;

    const geoJsonLayer = areaInMap(area);

    areaInControl(area, control, id);
}

function areaInControl (area, control, id) {

    // Add a figure
    const figure = document.createElement('figure');
    figure.classList = "area";
    figure.id = "a" + id;
    figure.setAttribute('data-id', id);

    // Set color with change the opacity
    figure.style.boxShadow = "0 0 3px 1px " + area.category.color + "cc";

    // Function to create p
    const newP = (className, idName, message) => {
        const p = document.createElement('p');
        p.classList = className;
        p.id = idName + id;            
        p.innerText = message;

        figure.appendChild(p);
    }

    // Add the name text
    newP("name", "na", area.name);

    // Add the category text
    newP("category", "c", area.category.type);

    // Add the tax
    newP("tax", "t", area.tax + "%");

    control.appendChild(figure);
}

function areaInMap (area) {

    // In geoJson format
    const areaInMap = {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": area.getPoints()
        }
    }

    // Model of style
    function makeStyle (o) {
        return {
            fillColor: area.category.color,
            weight: 2,
            opacity: o,
            color: "#000",
            fillOpacity: 0.7 
        };        
    }

    // Aply main style
    function style(feature) {
        return makeStyle(0.5);
    }

    // On functions
    function highlightFeature(e) {
        var layer = e.target;
    
        layer.setStyle(makeStyle(1));
    
        layer.bringToFront();
    }

    function resetHighlight(e) {
        var layer = e.target;
    
        layer.setStyle(makeStyle(0.5));
    
        layer.bringToFront();
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        });
    }
    
    // Put in map
    var geoJsonLayer = L.geoJSON(areaInMap, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    allLayer.push(geoJsonLayer);

    return geoJsonLayer;
}