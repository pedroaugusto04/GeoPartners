import { Component, ViewChild } from '@angular/core';
import { SeeBestPartnersComponent } from '../see-best-partners/see-best-partners.component';
import { LeafletComponent } from 'src/app/map/leaflet/leaflet.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Partner } from '../model/partner';

@Component({
  selector: 'app-best-partners',
  templateUrl: './best-partners.component.html',
  styleUrls: ['./best-partners.component.scss']
})
export class BestPartnersComponent {

  form: FormGroup;
  bestPartners!: Observable<Partner[]>;
  @ViewChild(SeeBestPartnersComponent) seeBestPartnersComponent!: SeeBestPartnersComponent;
  @ViewChild(LeafletComponent) leafletComponent!: LeafletComponent;
  
  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      address: [null]
    });
  }

  onSearchBestPartners() {
    this.leafletComponent.processMapData(this.form);  
    this.bestPartners = this.seeBestPartnersComponent.getBestPartners(this.form.value);
    this.leafletComponent.showBestPartners(this.bestPartners);
  }
}
