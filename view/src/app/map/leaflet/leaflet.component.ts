import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import { Map, DrawEvents, FeatureGroup, Layer, latLng, tileLayer, Marker, MarkerOptions, Control } from 'leaflet';
import { LeafletService } from '../services/leaflet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import '@geoman-io/leaflet-geoman-free';


@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss'],
  encapsulation: ViewEncapsulation.None // to style search bar
})
export class LeafletComponent {

  layers: Layer[] = [];
  drawnItems: FeatureGroup = new FeatureGroup();
  optionFalse: false = false;
  marker!: Marker;
  markerOptions: MarkerOptions;
  map!: Map

  constructor(private leafletService: LeafletService, private snackBar: MatSnackBar) {
    this.markerOptions = {
      icon: L.icon({
        iconUrl: 'marker-icon.png',
      }),
    }
  }
  processMapData(form: FormGroup) {
    if (this.isMapReady()) {
      let geometries = this.drawnItems;
      let coordinates: number[][][][] = [];
      geometries.eachLayer(function (layer) {
        if (layer instanceof L.Polygon) {
          let polygonCoords = (layer.getLatLngs() as L.LatLng[][]).map(function (latLngs) {
            return latLngs.map(function (latlng) {
              return [latlng.lng, latlng.lat];
            });
          });

          // the first and last positions in a LinearRing of coordinates must be the same
          if (polygonCoords.length >= 1) {
            let firstPoint = polygonCoords[0][0];
            let lastPoint = polygonCoords[polygonCoords.length - 1][polygonCoords[polygonCoords.length - 1].length - 1];
            if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
              polygonCoords[polygonCoords.length - 1].push(firstPoint);
            }
          }
          coordinates.push(polygonCoords);
        }
      });

      let formattedMultiPolygon = {
        "type": "MultiPolygon",
        "coordinates": coordinates
      };

      let multiPolygonGeoJson = JSON.stringify(formattedMultiPolygon);

      this.processMapPoint(form);

      form.patchValue({ 'coverageArea': multiPolygonGeoJson })
    }
  }

  processMapPoint(form: FormGroup) {
    if (this.isMapReady()) {
      let point = {
        "type": "Point",
        "coordinates": [this.marker.getLatLng().lng, this.marker.getLatLng().lat]
      }

      var pointGeoJson = JSON.stringify(point);

      form.patchValue({ 'address': pointGeoJson });
    }
  }

  //  main configs 
  options = {
    layers: [
      tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      })
    ],
    zoom: 4,
    center: latLng(46.879966, -121.726909)
  }

  drawOptions = {
    draw: {
      marker: {
        icon: L.icon({
          iconUrl: 'marker-icon.png'
        }),
      },
      polyline: this.optionFalse,
      rectangle: this.optionFalse,
      circle: this.optionFalse,
      circlemarker: this.optionFalse,
    },
    edit: {
      featureGroup: this.drawnItems
    }
  };

  public onDrawCreated(e: any) {
    this.drawnItems.addLayer((e as DrawEvents.Created).layer);
  }

  layersControl = {
    baseLayers: {
      'googleStreets': tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }),
      'googleSatellite': tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }),
    },
    overlays: {
    }
  }

  // search bar
  onMapReady(map: Map) {
    this.map = map;
    this.map.addLayer(this.drawnItems);
    const SearchControl = L.Control.extend({
      onAdd: () => {
        let container = L.DomUtil.create('div', 'search-address');
        let form = L.DomUtil.create('form', 'form-address', container);
        let input = L.DomUtil.create('input', 'input-address', form);
        let submit = L.DomUtil.create('button', 'button-address', form);
        submit.innerHTML = 'Search';
        input.placeholder = "City/District/Street/Number";

        L.DomEvent.addListener(form, 'submit', (event) => {
          event.preventDefault();
          let address = input.value;
          this.processAddress(address, map);
        });

        L.DomEvent.disableClickPropagation(container);
        return container;
      },
    });
    const searchControl = new SearchControl();
    map.addControl(searchControl);
  }

  // open street map search address
  processAddress(address: string, map: Map) {
    this.leafletService.processAddress(address).subscribe({
      next: (response: any) => {
        if (response.length === 0) {
          this.onInvalidAddress();
          return;
        }
        let lat = parseFloat(response[0].lat);
        let lon = parseFloat(response[0].lon);
        map.setView([lat, lon], 12);
        if (this.marker) {
          map.removeLayer(this.marker);
        }
        this.marker = L.marker([lat, lon], this.markerOptions).addTo(map);
        this.marker.bindPopup(`${address}`);
      },
      error: () => {
        this.onError();
      }

    })
  };

  isMapReady(): boolean {
    if (!this.map) {
      alert("Map is loading. Please wait.")
      return false;
    } else if (!this.marker) {
      alert("No address selected");
      return false;
    }
    return true;
  }

  onInvalidAddress() {
    this.snackBar.open("Invalid Address", '', { duration: 4000 });
  }

  onError() {
    this.snackBar.open("Error searching address", '', { duration: 4000 });
  }
}
