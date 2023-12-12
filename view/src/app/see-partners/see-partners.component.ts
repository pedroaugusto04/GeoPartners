import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PartnerService } from '../partners/services/partner.service';
import { LeafletComponent } from 'src/app/map/leaflet/leaflet.component';
import { Observable } from 'rxjs';
import { Partner } from '../partners/model/partner';

@Component({
  selector: 'app-see-partners',
  templateUrl: './see-partners.component.html',
  styleUrls: ['./see-partners.component.scss']
})


export class SeePartnersComponent implements AfterViewInit {

  partners!: Observable<Partner[]>;
  @ViewChild(LeafletComponent) LeafletComponent!: LeafletComponent;

  constructor(private PartnerServiceImpl: PartnerService) { }

  getAll(): Observable<Partner[]> {
    return this.PartnerServiceImpl.getAll();
  }

  ngAfterViewInit() {
    this.LeafletComponent.isMapReady();
    this.LeafletComponent.showPartners(this.getAll());
  }
}
