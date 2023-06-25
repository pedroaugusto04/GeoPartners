var marker;

// creating map
let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    getTileUrl: function(coords) {
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
  cutPolygon: true,
});

// address search bar
L.Control.Search = L.Control.extend({
  onAdd: function(map) {
      var container = L.DomUtil.create('div', 'search-address');
      var form = L.DomUtil.create('form', 'form-address', container);
      var input = L.DomUtil.create('input', 'input-address', form);
      var submit = L.DomUtil.create('button', 'button-address', form);
      submit.innerHTML = 'Search';
      input.placeholder = "City/District/Street/Number";

      L.DomEvent.addListener(form, 'submit', function(event) {
          event.preventDefault();
          var address = input.value;
          geocode(address);
      });
      L.DomEvent.disableClickPropagation(container);
      return container;
  }
});

L.control.search = function(options) {
  return new L.Control.Search(options);
}
L.control.search().addTo(map);

// sending form data to server
document.querySelector("#update-form").addEventListener("submit", function(event) {
  event.preventDefault();

  let formData = new FormData(this);

  let geometries = map.pm.getGeomanDrawLayers();

  let polygons = geometries.map(geometry => {
    let geometryGeoJson = geometry.toGeoJSON();
    return turf.polygon(geometryGeoJson.geometry.coordinates);
  });

  let multiPolygon = turf.multiPolygon(polygons.map(polygon => polygon.geometry.coordinates));

  multiPolygon = {
    "type": "MultiPolygon",
    "coordinates": multiPolygon.geometry.coordinates
  };
  
  let multiPolygonGeoJson = JSON.stringify(multiPolygon);
  
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

  formData.append("coverageArea",multiPolygonGeoJson);

  formData.append("address",pointGeoJson);

  let formDataJson = JSON.stringify(Object.fromEntries(formData));

  fetch("https://192.168.0.111:8080/geopartners/logic/update", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: formDataJson
  })
  .then(response => response.text())
  .then(message => alert(message))
  .catch(error => {
    console.error(error);
  })
});

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
    let lat = parseFloat(data[0].lat);
    let lon = parseFloat(data[0].lon);
    map.setView([lat,lon]);
    if (marker){
      map.removeLayer(marker);
    }
    marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(`${address}`);
  })
  .catch(error => {
    console.error(error);
    alert('Address search error');
  });
}