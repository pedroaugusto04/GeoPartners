import { Injectable } from '@angular/core';
import { PartnerService } from '../../services/partner.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Partner } from '../../model/partner';

@Injectable({
  providedIn: 'root'
})
export class TableService {


  constructor(private partnerService: PartnerService, private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private router: Router, private route: ActivatedRoute) { }


  getAll(): Observable<Partner[]> {
    return this.partnerService.getAll();
  }

  onDelete(id: string, partners: Observable<Partner[]>) {
    this.partnerService.delete(id).subscribe({
      next: () => {},
      error: () => this.onError()
    })
    return this.onSucess(id,partners);
  }

  filterByName(form: FormGroup): Observable<Partner[]> {
    if (form.value.tradingName != '') {
      return this.partnerService.getAll().pipe(
        map((partners: Partner[]) => partners.filter(partner => partner.tradingName === form.value.tradingName)));
    }
    return this.partnerService.getAll();
  }

  onSucess(id: string, partners: Observable<Partner[]>) {
    this.snackBar.open("Place deleted successfully!", '', { duration: 4000 });
    return partners.pipe(
      map((partners: Partner[]) => partners.filter(partner => partner.document !== id)));
  }


  onError() {
    this.snackBar.open("Error deleting place", '', { duration: 4000 });
  }
}
