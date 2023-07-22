import { Component } from '@angular/core';
import { Partner } from '../model/partner';
import { PartnerService } from '../services/partner.service';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressDTO } from '../model/address-dto';

@Component({
  selector: 'app-see-best-partners',
  templateUrl: './see-best-partners.component.html',
  styleUrls: ['./see-best-partners.component.scss']
})
export class SeeBestPartnersComponent {

  bestPartners!: Observable<Partner[]>;
  displayedColumns = ['id', 'ownerName', 'tradingName', 'document'];
  form: FormGroup;
  lastAddress?: AddressDTO;

  constructor(private partnerService: PartnerService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      tradingName: ['']
    })
  }

  getBestPartners(record: AddressDTO) {
    this.lastAddress = record;
    this.bestPartners = this.partnerService.getBest(record);
  }


  filterByName() {
    if (this.lastAddress) {
      this.bestPartners = this.partnerService.getBest(this.lastAddress)
    } else {
      this.onFilterError();
      return;
    };
    if (this.form.value.tradingName != '') {
      this.bestPartners.subscribe((bestPartners: Partner[]) => {
        this.bestPartners = of(bestPartners.filter(bestPartner => bestPartner.tradingName === this.form.value.tradingName));
      });
    }
  }

  onSucess(id: string) {
    this.snackBar.open("Successfully search!", '', { duration: 4000 });
    this.bestPartners.subscribe((bestPartners: Partner[]) => {
      this.bestPartners = of(bestPartners.filter(bestPartner => bestPartner.document !== id));
    });
  }

  onError() {
    this.snackBar.open("Error searching", '', { duration: 4000 });
  }

  onFilterError() {
    this.snackBar.open("No partners to filter", '', { duration: 4000 });
  }
}