import { Component, ViewChild } from '@angular/core';
import { SeeBestPartnersComponent } from '../see-best-partners/see-best-partners.component';
import { LeafletComponent } from 'src/app/map/leaflet/leaflet.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-best-partners',
  templateUrl: './best-partners.component.html',
  styleUrls: ['./best-partners.component.scss']
})
export class BestPartnersComponent {

  form: FormGroup;
  @ViewChild(SeeBestPartnersComponent) seeBestPartnersComponent!: SeeBestPartnersComponent;
  @ViewChild(LeafletComponent) leafletComponent!: LeafletComponent;
  
  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      address: [null]
    });
  }

  onSearchBestPartners() {
    this.leafletComponent.processMapData(this.form);  
    this.seeBestPartnersComponent.getBestPartners(this.form.value);
  }
}
