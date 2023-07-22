import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PartnerService } from '../services/partner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LeafletComponent } from 'src/app/map/leaflet/leaflet.component';

@Component({
  selector: 'app-register-partner',
  templateUrl: './register-partner.component.html',
  styleUrls: ['./register-partner.component.scss']
})
export class RegisterPartnerComponent {

  form: FormGroup;
  @ViewChild(LeafletComponent) leafletComponent!: LeafletComponent;

  constructor(private formBuilder: FormBuilder, private partnerService: PartnerService,
    private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      ownerName: [null],
      tradingName: [null],
      document: [null],
      address: [null],
      coverageArea: [null]
    });
  }

  onSubmit() {
    this.leafletComponent.processMapData(this.form);  
    this.partnerService.save(this.form.value).subscribe({
      next: () => {
        this.onSucess();
      },
      error: () => {
        this.onError();
      }
    });
  }

  onCancel() {
    this.router.navigate([''], { relativeTo: this.route });
  }

  onSucess() {
    this.snackBar.open("Partner saved successfully!", '', { duration: 4000 });
  }

  onError() {
    this.snackBar.open("Error saving partner", '', { duration: 4000 });
  }

}

