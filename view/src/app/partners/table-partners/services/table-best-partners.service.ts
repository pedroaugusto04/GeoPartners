import { Injectable, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { Partner } from '../../model/partner';
import { GeometriesDTO } from '../../model/geometries-dto';
import { PartnerService } from '../../services/partner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TableBestPartnersService {
  lastGeometries?: GeometriesDTO;

  constructor(private partnerService: PartnerService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  getBestPartners(record: GeometriesDTO): Observable<Partner[]> {
    this.lastGeometries = record;
    let bestPartners: Observable<Partner[]> = this.partnerService.getBest(record).pipe(
      (map((bestPartners: Partner[]) => {
        return bestPartners;
      }))
    )
    return bestPartners;
  }


  filterByName(form: FormGroup) {
    let bestPartners: Observable<Partner[]>;
    if (this.lastGeometries) {
      bestPartners = this.partnerService.getBest(this.lastGeometries);
    } else {
      this.onFilterError();
      return;
    }
    if (form.value.tradingName != '') {
      bestPartners = bestPartners.pipe(map((bestPartners: Partner[]) => {
        return bestPartners.filter(bestPartner => bestPartner.tradingName === form.value.tradingName)
      }))
    }
    return bestPartners;
  }
  
  onFilterError() {
    this.snackBar.open("No partners to filter", '', { duration: 4000 });
  }
}
