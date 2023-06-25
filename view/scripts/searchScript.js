var marker;
var markers = new Array();
// creating map
let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    getTileUrl: function (coords) {
        var url = L.TileLayer.prototype.getTileUrl.call(this, coords);
        return url + '?v=' + (new Date().getTime()); // adiciona um parâmetro de consulta exclusivo
    }
}).addTo(map);

map.pm.addControls({
    position: 'topleft',
    drawCircle: false,
    drawMarker: false,
    drawPolyline: false,
    drawRectangle: false,
    drawCircleMarker: false,
    editMode: true,
    dragMode: false,
    drawText: false,
    cutPolygon: false
});

// address search bar
L.Control.Search = L.Control.extend({
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'search-address');
        var form = L.DomUtil.create('form', 'form-address', container);
        var input = L.DomUtil.create('input', 'input-address', form);
        var submit = L.DomUtil.create('button', 'button-address', form);
        submit.innerHTML = 'Search';
        input.placeholder = "City/District/Street/Number";

        L.DomEvent.addListener(form, 'submit', function (event) {
            event.preventDefault();
            cleanTable();
            var address = input.value;
            geocode(address);
        });
        L.DomEvent.disableClickPropagation(container);
        return container;
    }
});

L.control.search = function (options) {
    return new L.Control.Search(options);
}

L.control.search().addTo(map);

// sending form data to server
document.querySelector("#search-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(this);

    let geometries = map.pm.getGeomanDrawLayers();

    let polygons = geometries.map(geometry => {
        let geometryGeoJson = geometry.toGeoJSON();
        return turf.polygon(geometryGeoJson.geometry.coordinates);
    });

    let point;
    if (marker) {
        point = {
            "type": "Point",
            "coordinates": [marker.getLatLng().lng, marker.getLatLng().lat]
        }
    } else {
        alert("No address selected");
        return;
    }

    var pointGeoJson = JSON.stringify(point);

    formData.append("address", pointGeoJson);

    let formDataJson = JSON.stringify(Object.fromEntries(formData));

    fetch("http://192.168.0.111:8080/geopartners/logic/search", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: formDataJson
    })
        .then(response => response.json())
        .then(data => {
            if (Object.keys(data).length > 0){
                loadTable(data);
            } else {
                alert("No partners nearby");
            }
        })
        .catch(error => {
            console.error(error);
        })
});

function loadTable(data) {
    const table = document.querySelector(".table");
    count = 0;
    while (table.rows.length > 1) { // clean before load
        table.deleteRow(1);
    }
    for (const partner of data) {
        count++;
        const row = table.insertRow();
        const placeCell = row.insertCell(0);
        const idCell = row.insertCell(1);
        const tradingNameCell = row.insertCell(2);
        const ownerNameCell = row.insertCell(3);
        placeCell.innerHTML = count;
        idCell.innerHTML = partner.id
        ownerNameCell.innerHTML = partner.ownerName;
        tradingNameCell.innerHTML = partner.tradingName;
        insertPoint(partner.address, count);
    }
}

function cleanTable() {
    const table = document.querySelector(".table");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}
// map response
function geocode(address) {
    const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`;
    fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    alert('Invalid address');
                    return;
                }
                for (i = 0; i < markers.length; i++) {
                    map.removeLayer(markers[i]);
                }
                let lat = parseFloat(data[0].lat);
                let lon = parseFloat(data[0].lon);
                map.setView([lat, lon]);
                map.setView([lat, lon]);
                marker = L.marker([lat, lon]).addTo(map);
                markers.push(marker);
                marker.bindPopup(`${address}`);
            })
            .catch(error => {
                console.error(error);
                alert('Address search error');
            });
}


var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


function insertPoint(address, count) {
    let lat = parseFloat(address.coordinates[1]);
    let lon = parseFloat(address.coordinates[0]); // longitude first element
    map.setView([lat, lon]);
    if (count === 1) {
        marker = L.marker([lat, lon], {icon: goldIcon}).addTo(map); // gold to best partner
        markers.push(marker);
    } else {
        marker = L.marker([lat, lon], {icon: redIcon}).addTo(map);
        markers.push(marker);
    }
    marker.bindPopup(count + " Place");
}