import {elements, map, clickInAnChild, slideInX} from "./index.js";

export let allLayer = [];

export default function addArea (area) {

    const control = elements.control();

    const geoJsonLayer = areaInMap(area);

    const inControl = areaInControl(area, control, geoJsonLayer[0]._leaflet_id, geoJsonLayer);

    console.log(area);
    
    allLayer.push([geoJsonLayer, inControl]);
}

function backAreaInControl (id) {

    const control = elements.control();
    const children = Array.from(control.children);

    if (children[0].children[0].getAttribute('data-leaflet') == id) {
        return;
    }

    const node = children.find(e => e.children[0].getAttribute('data-leaflet') == id);

    node.style.animation = 'moveElement 0.3s'

    setTimeout(() => {
        node.style.animation = ''
    }, 300);

    control.insertBefore(node, children[0]);
}

let positionInitial;

function areaInControl (area, control, leaflet, e) {

    const figureToremove = document.createElement('figure');

    // Add a figure
    const figure = document.createElement('figure');
    figure.classList = "area";
    figure.setAttribute('data-leaflet', leaflet);

    // Set color with change the opacity
    figure.style.boxShadow = "0 0 3px 1px " + area.category.color + "cc";

    // Function to create p
    const newP = (className, idName, message) => {
        const p = document.createElement('p');
        p.classList = className;       
        p.innerText = message;

        figure.appendChild(p);
    }

    // Add the name text
    newP("name", "na", area.name);

    // Add the category text
    newP("category", "c", area.category.type);

    function removeElement () {
        figure.remove();
        map.removeLayer(e[0]);
    }

    figureToremove.appendChild(figure);
    control.appendChild(figureToremove)

    figure.addEventListener('mouseenter', () => {
        map.fitBounds(e[1]);
    })

    const removeBehind = document.createElement('div');
    removeBehind.classList = 'removeBehind';
    figureToremove.append(removeBehind);

    figureToremove.addEventListener('click', act => {

        if ((positionInitial - act.clientX) > 30) {
            slideInX(1, 2, figureToremove, 0.2);

            setTimeout(() => {
                removeElement();   
            }, 200);
        }

        setTimeout(() => {
            clickInAnChild(false);
        }, 300);
    })

    figureToremove.addEventListener('mousedown', act => {
        clickInAnChild(true);
        positionInitial = act.clientX;
    })

    return figureToremove;
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

    // Apply main style
    function style(feature) {
        return makeStyle(0.5);
    }

    // On functions
    function highlightFeature(e) {

        var layer = e.target;
    
        layer.setStyle(makeStyle(1));
    
        layer.bringToFront();

        backAreaInControl(Object.keys(e.sourceTarget._eventParents)[0])
    }

    function resetHighlight(e) {
        var layer = e.target;
    
        layer.setStyle(makeStyle(0.5));
    
        layer.bringToFront();
    }

    var thisE;

    function onEachFeature(feature, layer) {

        thisE = layer.getBounds();

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

    return [geoJsonLayer, thisE];
}