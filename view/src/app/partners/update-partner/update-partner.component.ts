import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PartnerService } from '../services/partner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LeafletComponent } from 'src/app/map/leaflet/leaflet.component';

@Component({
  selector: 'app-update-partner',
  templateUrl: './update-partner.component.html',
  styleUrls: ['./update-partner.component.scss']
})
export class UpdatePartnerComponent {

  form: FormGroup;
  @ViewChild(LeafletComponent) leafletComponent!: LeafletComponent;
  id: string;

  constructor(private formBuilder: FormBuilder, private partnerService: PartnerService,
    private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.form = this.formBuilder.group({
      document: [this.id],
      ownerName: [null],
      tradingName: [null],
      address: [null],
      coverageArea: [null]
    });
  }

  onUpdate() {
    this.leafletComponent.processMapData(this.form);
    this.partnerService.update(this.form.value).subscribe({
      next: () => {
        this.onSucess();
      },
      error: () => {
        this.onError();
      }
    });
  }

  onCancel() {
    this.router.navigate(['/partners'], { relativeTo: this.route });
  }

  onSucess() {
    this.snackBar.open("Partner updated successfully!", '', { duration: 4000 });
  }

  onError() {
    this.snackBar.open("Error updating partner", '', { duration: 4000 });
  }

}