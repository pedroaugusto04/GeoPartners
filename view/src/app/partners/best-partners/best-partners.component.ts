import { Component, ViewChild } from '@angular/core';
import { LeafletComponent } from 'src/app/map/leaflet/leaflet.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Partner } from '../model/partner';
import { PartnerService } from '../services/partner.service';

@Component({
  selector: 'app-best-partners',
  templateUrl: './best-partners.component.html',
  styleUrls: ['./best-partners.component.scss']
})
export class BestPartnersComponent {

  form: FormGroup;
  @ViewChild(LeafletComponent) leafletComponent!: LeafletComponent;

  constructor(private formBuilder: FormBuilder, private PartnerServiceImpl:PartnerService) {
    this.form = this.formBuilder.group({
      address: [null],
      coverageArea:[null]
    });
  }

  onSearchBestPartners() {
      this.leafletComponent.processMapData(this.form);
      const bestPartners: Observable<Partner[]> = this.PartnerServiceImpl.getBest(this.form.value);
      this.leafletComponent.showPartners(bestPartners);
  }
}
