import {layer, map} from "./index.js";
import { allLayer } from "./addarea.js";
import a from "./model/area.js";

export default function (e) {
    
    if (layer == 0) {
        citizenLayer();
    }

    else if (layer == 1) {
        cityLayer();
    }

    else if (layer == 2) {
        stateLayer(e.latlng);
    }

    else if (layer == 3) {
        federalLayer();
    }
}

// State level

var area = new a();
var space;
var showConfirmArea;

function stateLayer (p) {
    tempArea(p.lat, p.lng)
}

function tempArea (lat, lng) {
    area.addPoint(lat, lng);
    createArea();
}

function createArea () {

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

    if (area.points.length == 3) {
        
    }

    space = L.geoJSON(areaInMap, {style: style}).addTo(map);
}

// Citizen level

function citizenLayer () {
    console.log("citizen");
}

function cityLayer () {
    console.log("city")
}

function federalLayer () {
    console.log("federal")
}