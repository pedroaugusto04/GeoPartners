import { Component } from '@angular/core';
import { Partner } from '../partner';
import { PartnerService } from '../services/partner.service';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-see-partners',
  templateUrl: './see-partners.component.html',
  styleUrls: ['./see-partners.component.scss']
})
export class SeePartnersComponent {

  partners: Observable<Partner[]>;
  displayedColumns = ['id', 'ownerName', 'tradingName', 'document', 'actions'];
  form: FormGroup;

  constructor(private partnerService: PartnerService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.partners = partnerService.getAll();
    this.form = this.formBuilder.group({
      tradingName: ['']
    })
  }

  onDelete(id: string) {
    return this.partnerService.delete(id).subscribe({
      next: () => {
        this.onSucess(id);
      },
      error: () => {
        this.onError();
      }
    });
  }

  filterByName() {
    this.partners = this.partnerService.getAll();
    if (this.form.value.tradingName != '') {
      this.partners.subscribe((partners: Partner[]) => {
        this.partners = of(partners.filter(partner => partner.tradingName === this.form.value.tradingName));  
      });
    }
  }

  onSucess(id: string) {
    this.snackBar.open("Place deleted successfully!", '', { duration: 4000 });
    this.partners.subscribe((partners: Partner[]) => {
      this.partners = of(partners.filter(partner => partner.id !== id));
    });
  }

  onError() {
    this.snackBar.open("Error deleting place", '', { duration: 4000 });
  }

}
