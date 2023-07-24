import { Component, ViewChild } from '@angular/core';
import { LeafletComponent } from 'src/app/map/leaflet/leaflet.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TablePartnersComponent } from '../table-partners/table-partners.component';
import { Observable } from 'rxjs';
import { Partner } from '../model/partner';

@Component({
  selector: 'app-best-partners',
  templateUrl: './best-partners.component.html',
  styleUrls: ['./best-partners.component.scss']
})
export class BestPartnersComponent {

  form: FormGroup;
  @ViewChild(TablePartnersComponent) tablePartnersComponent!: TablePartnersComponent;
  @ViewChild(LeafletComponent) leafletComponent!: LeafletComponent;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      address: [null],
      coverageArea:[null]
    });
  }

  onSearchBestPartners() {
      this.leafletComponent.processMapData(this.form);
      const bestPartners: Observable<Partner[]> = this.tablePartnersComponent.getBestPartners(this.form.value);
      this.leafletComponent.showBestPartners(bestPartners);
  }
}
