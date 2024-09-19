import {layer, map} from "./index.js";
import { allLayer } from "./addarea.js";
import a from "./model/area.js";
import { stateLayer } from "./js/state.js";

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