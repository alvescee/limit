import {elements, map} from "./index.js";

export let allLayer = [];

export default function addArea (area) {

    const control = elements.control();
    const id = area.id;

    const geoJsonLayer = areaInMap(area);

    const inControl = areaInControl(area, control, id, geoJsonLayer._leaflet_id);

    allLayer.push([geoJsonLayer, inControl]);
}

function backAreaInControl (id) {

    const control = elements.control();
    const children = Array.from(control.children);

    if (children[0].getAttribute('data-leaflet') == id) {
        return;
    }

    const node = children.find(e => e.getAttribute('data-leaflet') == id);

    node.style.animation = 'moveElement 0.3s'

    setTimeout(() => {
        node.style.animation = ''
    }, 300);

    control.insertBefore(node, children[0]);
}

function areaInControl (area, control, id, leaflet) {

    // Add a figure
    const figure = document.createElement('figure');
    figure.classList = "area";
    figure.id = "a" + id;
    figure.setAttribute('data-id', id);
    figure.setAttribute('data-leaflet', leaflet);

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

    figure.addEventListener('mouseenter', () => {
        map.setView(calcCenterPolygon(area.getPoints()[0]), 16);
    })

    return figure;
}

function calcCenterPolygon (line) {

    const n = line.length;

    if (n < 3) {
        throw new Error("Um polígono deve ter pelo menos 3 vértices.");
    }

    let area = 0;
    let cx = 0;
    let cy = 0;

    for (let i = 0; i < n; i++) {
        const x1 = line[i][0];
        const y1 = line[i][1];
        const x2 = line[(i + 1) % n][0];
        const y2 = line[(i + 1) % n][1];

        const f = x1 * y2 - x2 * y1;
        area += f;
        cx += (x1 + x2) * f;
        cy += (y1 + y2) * f;
    }

    area /= 2;
    const factor = 1 / (6 * area);
    cx *= factor;
    cy *= factor;

    return [cy, cx];
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

    return geoJsonLayer;
}