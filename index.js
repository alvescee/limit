const elements = {
    map: () => document.querySelector("#map"),
    ratio: () => document.querySelectorAll("input.view"),
    sect: () => document.querySelector("section"),
    article: n => document.querySelector('article.' + n)
}

// About the map

window.addEventListener('load', () => {
    const city = [-22.28036, -42.534943];
    const zoom = 12;

    var map = elements.map();

    map = L.map('map').setView(city, zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.on('click', onMapClick);
})

function onMapClick(e) {
    alert(e.latlng.lat + ", " + e.latlng.lng);
}

// About the ratio button to change the view

let waitBeforeWheelAgain = false;
const durationInAnimationUp = 0.3;

window.addEventListener('load', () => {

    const input = elements.ratio();
    const sect = elements.sect();

    input[0].addEventListener('change', () => {
        modeView(true, 0);
    })

    input[1].addEventListener('change', () => {
        modeView(false, "-100%");
    })

    sect.addEventListener("wheel", () => {

        if (waitBeforeWheelAgain == true) {
            return;
        }

        if (input[0].checked == true) {
            input[1].checked = true;
            modeView(false, "-100%");
        } else {
            input[0].checked = true;
            modeView(true, 0);
        }

        waitBeforeWheelAgain = true;

        setTimeout(() => {
            waitBeforeWheelAgain = false;
        }, durationInAnimationUp * 1000);
    })

})

function modeView (isReverse, topFinal) {

    const view = name => {
        let e = elements.article(name).style;
        
        e.animationName = "directionView";
        e.animationDuration = durationInAnimationUp + "s";

        if (isReverse) {
            e.animationDirection = "reverse";    
        }

        e.top = topFinal;

        setTimeout(() => {
            e.animation = "";
        }, durationInAnimationUp * 1000)
    }

    view("control");
    view("layer");
}

// ---