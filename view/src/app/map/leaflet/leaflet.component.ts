import { Component } from '@angular/core';
import * as L from 'leaflet';
import { DrawEvents, FeatureGroup, Layer, PolylineOptions, circle, featureGroup, icon, latLng, marker, polygon, tileLayer } from 'leaflet';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss']
})
export class LeafletComponent {

  layers: Layer[] = [];
  drawnItems: FeatureGroup = featureGroup();
  optionFalse: false = false;

  constructor() {
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
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'marker-icon.png',
          shadowUrl: 'marker-shadow.png'
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

}
