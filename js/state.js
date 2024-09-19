import { elements } from "../index.js";
import { categorys } from "../model/area.js";
import {layer, map} from "../index.js";
import { allLayer } from "../addarea.js";
import addArea from "../addarea.js";
import a from "../model/area.js";

export default function () {

    const action = elements.action();
    action.innerHTML = '';

    const inputName = document.createElement('input');
    inputName.placeholder = "Nome da área"

    const elementsPointsPanel = document.createElement('div');
    elementsPointsPanel.classList = 'elementsPoints'

    const create = document.createElement('button');
    create.addEventListener('click', createArea);
    create.innerText = '+';
    create.type = 'button';
    create.classList = 'createBtn'

    action.append(inputName);
    action.append(elementsPointsPanel);
    action.append(create);

}

function createArea (e) {
    
}

// State level

var area = new a();
var space;

export function stateLayer (p) {
    tempArea(p.lat, p.lng)
}

function tenDecimal (number) {
    return (number + '').substring(0, 10);
}

function tempArea (lat, lng) {
    area.addPoint(lat, lng);

    const point = document.createElement('div');
    point.innerHTML = tenDecimal(lat) + ', ' + tenDecimal(lng);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '-';
    deleteBtn.type = 'button';
    deleteBtn.classList = 'deleteBtn';

    point.append(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        point.remove();
        area.removePoint(lat, lng);
        updateArea();
    })

    elements.pointsState().append(point);

    updateArea();
}

function updateArea () {

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
            fillColor: "#444",
            weight: 2,
            opacity: o,
            color: "#000",
            dashArray: 3,
            fillOpacity: 0.7 
        };        
    }

    // Apply main style
    function style(feature) {
        return makeStyle(0.5);
    }

    // Put in map
    if (space != undefined) {
        map.removeLayer(space);   
    }

    space = L.geoJSON(areaInMap, {style: style}).addTo(map);
}