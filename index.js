// Imports
import {mock} from "./model/area.js";
import a from "./model/area.js";
import addArea from "./addarea.js";
import onMapClick, { tempArea } from "./js/state.js"

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
    action: () => document.querySelector('form.action'),
    pointsState: () => document.querySelector('div.elementsPoints'),
    btnCreate: () => document.querySelector('button.createBtn')
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

    map.on('click', tempArea);

    elements.btnCreate().addEventListener('click', act => {
        onMapClick(act);
    })
})

window.addEventListener('load', () => {
    
    mock.forEach(area => {
        addArea(area)
    })
})

// About the ratio button to change the view

let positionInitialX = 0;
const durationInAnimationUp = 0.3;

window.addEventListener('load', () => {

    const sect = elements.sect();
    const inputs = elements.ratio();

    inputs.forEach(e => {
        e.addEventListener('click', onClickInInput);
    })

    sect.addEventListener("mouseup", onPassSide)

    sect.addEventListener("mousedown", action => {
        positionInitialX = action.screenX;
    })
})

function onClickInInput (action) {
    
    const inputs = Array.from(elements.ratio());
    const selectElement = inputs.find(el => el.checked == false);
    const index = inputs.indexOf(selectElement);

    if (index == 0) {
        smoothScrollBy(1)
    } else {smoothScrollBy(-1)}
}

function onPassSide (action) {

    const allInput = elements.ratio();

    const distance = action.screenX - positionInitialX;

    if (10 > distance < -10) {return;}

    const isToLeft = (distance > 10) ? true : false;

    if (isToLeft && allInput[0].checked) {
        return;
    }

    if (!isToLeft && allInput[allInput.length - 1].checked) {
        return;
    }

    if (isToLeft) {
        smoothScrollBy(-1);
    }

    else {
        smoothScrollBy(1);
    }

    changeInput(isToLeft);
}

function changeInput (isToLeft) {
    const ratios = Array.from(elements.ratio());
    const input = ratios.find(x => x.checked == true);
    const index = ratios.indexOf(input);

    ratios[(isToLeft) ? index -1 : index + 1].checked = true;
}

function smoothScrollBy(direct) {

    const inputs = elements.ratio().length;

    const element = elements.main();
    const x = element.scrollWidth * direct / inputs;

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