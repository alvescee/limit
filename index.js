// About the map

window.addEventListener('load', () => {
    const city = [-22.28036, -42.534943];
    const zoom = 12;

    var map = document.querySelector("#map");

    map = L.map('map').setView(city, zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    map.on('click', onMapClick);
})

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
    console.log(e)
}

// About the ratio button to change the view

let waitBeforeWheelAgain = false;
const durationInAnimationUp = 0.3;

window.addEventListener('load', () => {

    const input = document.querySelectorAll("input.view");
    const sect = document.querySelector("section");

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
        let e = document.querySelector('article.' + name).style;
        
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