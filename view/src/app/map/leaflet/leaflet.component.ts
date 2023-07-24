import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';
import { Map, DrawEvents, FeatureGroup, Layer, latLng, tileLayer, Marker, MarkerOptions } from 'leaflet';
import { LeafletService } from '../services/leaflet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import '@geoman-io/leaflet-geoman-free';
import { Observable } from 'rxjs';
import { Partner } from 'src/app/partners/model/partner';
import * as turf from '@turf/turf'

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
  @Input() title: string = 'Insert Address / Coverage Area:'
  goldIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  constructor(private leafletService: LeafletService, private snackBar: MatSnackBar) {
    this.markerOptions = {
      icon: this.blueIcon
    }
  }
  processMapData(form: FormGroup) {
    this.isMapReady();
    this.clearPoints();
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

    if (coordinates.length === 0) {
      let error = new Error("No Coverage Area informed.");
      this.onMapError(error.message);
      throw error;
    }

    let formattedMultiPolygon = {
      "type": "MultiPolygon",
      "coordinates": coordinates
    };

    let multiPolygonGeoJson = JSON.stringify(formattedMultiPolygon);

    this.processMapPoint(form);

    form.patchValue({ 'coverageArea': multiPolygonGeoJson })



  }

  processMapPoint(form: FormGroup) {
    this.isMapReady();
    let point = {
      "type": "Point",
      "coordinates": [this.marker.getLatLng().lng, this.marker.getLatLng().lat]
    }

    var pointGeoJson = JSON.stringify(point);

    form.patchValue({ 'address': pointGeoJson });
  }

  showBestPartners(bestPartners: Observable<Partner[]>) {
    let featureCollection = { "type": "FeatureCollection", "features": <any>[] }
    bestPartners.subscribe((partners: Partner[]) => {
      partners.forEach(partner => {
        let pointCoord = JSON.parse(JSON.stringify(partner.address)).coordinates;
        let point = turf.point(pointCoord);
        let lon = point.geometry.coordinates[0];
        let lat = point.geometry.coordinates[1];
        L.marker([lat, lon], { icon: this.goldIcon }).bindPopup(`${partner.tradingName}`).addTo(this.map);
      })
    })
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
        icon: this.blueIcon
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
    if (e.layer instanceof L.Marker) {
      this.marker = e.layer;
      this.clearPoints();
      this.drawnItems.addLayer((e as DrawEvents.Created).layer.bindPopup(`${this.marker.getLatLng().lng + ", " + this.marker.getLatLng().lat}`));
    } else {
      this.drawnItems.addLayer((e as DrawEvents.Created).layer);
    }
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
    this.clearPoints();
    this.leafletService.processAddress(address).subscribe({
      next: (response: any) => {
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

  isMapReady(): void {
    if (!this.map) {
      let error = new Error("Map is loading. Please wait.");
      this.onMapError(error.message);
      throw error;
    } else if (!this.marker) {
      let error = new Error("No address selected");
      this.onMapError(error.message);
      throw error;
    }
  }

  clearPoints() {
    this.map.eachLayer(layer => {
      if (layer instanceof L.Marker && layer !== this.marker) {
        if (this.map.getBounds().contains(layer.getLatLng())) {
          this.map.removeLayer(layer);
        }
      }
    })
  }

  onError() {
    this.snackBar.open("Error searching address", '', { duration: 4000 });
  }

  onMapError(messageError: string) {
    this.snackBar.open(messageError, '', { duration: 4000 });
  }
}
