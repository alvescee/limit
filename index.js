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