// Imports
import {mock} from "./model/area.js";
import a from "./model/area.js";
import addArea from "./addarea.js";

export var map;

window.addEventListener('load', () => {
    map = document.querySelector("#map");
})

export const elements = {
    ratio: () => document.querySelectorAll("input.view"),
    sect: () => document.querySelector("section"),
    article: n => document.querySelector('article.' + n),
    control: () => document.querySelector('article.control'),
    main: () => document.querySelector('main'),
    range: () => document.querySelector('#range')
}

// About the map

window.addEventListener('load', () => {
    const city = [-22.28036, -42.534943];
    const zoom = 12;

    map = L.map('map').setView(city, zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.on('click', onMapClick);
})

function onMapClick(e) {
    
    if (layer == 0) {
        citizenLayer();
    }

    else if (layer == 1) {
        cityLayer();
    }

    else if (layer == 2) {
        stateLayer();
    }

    else if (layer == 3) {
        federalLayer();
    }
}

window.addEventListener('load', () => {
    
    mock.forEach(area => {
        addArea(area)
    })
})

// About the ratio button to change the view

let isPass = false;
let isSelectingText = false;
let positionInitialX = 0;
const durationInAnimationUp = 0.3;

window.addEventListener('load', () => {

    const input = elements.ratio();
    const sect = elements.sect();

    input[0].addEventListener('change', () => {
        smoothScrollBy(-1)
    })

    input[1].addEventListener('change', () => {
        smoothScrollBy(1)
    })

    sect.addEventListener("mouseup", action => {

        if (isSelectingText == true) {
            return;
        }

        const direction = action.screenX - positionInitialX;

        // To left
        if (direction > 10 && !input[0].checked) {
            input[0].checked = true;
            smoothScrollBy(-1)
        }

        // To right
        else if (direction < -10 && !input[1].checked) {
            input[1].checked = true;
            smoothScrollBy(1)
        }
    })

    sect.addEventListener("mousedown", action => {
        positionInitialX = action.screenX;
    })

    document.addEventListener("selectionchange", e => {

        isSelectingText = true;

        setTimeout(() => {
            isSelectingText = false;
        }, 100);
    })

})

function smoothScrollBy(direct) {

    const element = elements.main();
    const x = element.scrollWidth * direct;

    const startX = element.scrollLeft;
    const endX = startX + x;
    
    const startTime = performance.now();
  
    function step(currentTime) {

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (durationInAnimationUp * 1000), 1);
        const scrollX = startX + (endX - startX) * progress;
        element.scrollLeft = scrollX;
  
        if (elapsed < (durationInAnimationUp * 1000)) {
            requestAnimationFrame(step);
        } else {
            element.scrollLeft = endX;
        }
    }
  
    requestAnimationFrame(step);
}  

// Choose layer

var layer = 0;

window.addEventListener('load', () => {

    const range = elements.range();

    range.addEventListener('click', e => {
        
        if (range.value > 81) {
            range.value = 100;
            layer = 3;
        } 
        
        else if (range.value > 51) {
            range.value = 66;
            layer = 2;
        } 
        
        else if (range.value > 17) {
            range.value = 34;
            layer = 1;
        } 
        
        else {
            range.value = 0;
            layer = 0;
        }
    })

})

function citizenLayer () {
    console.log("citizen");
}

function cityLayer () {
    console.log("city")
}

function stateLayer () {
    console.log("state")
}

function federalLayer () {
    console.log("federal");
}