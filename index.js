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

window.addEventListener('load', () => {

    const input = document.querySelectorAll("input.view");

    const changeView = (input, fun) => {
        input.addEventListener('click', () => {
            fun();
        })        
    }
    
    changeView(input[0], () => {console.log(input[0].value)});

    changeView(input[1], () => {console.log(input[1].value)});
})