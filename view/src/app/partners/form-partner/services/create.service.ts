import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LeafletComponent } from 'src/app/map/leaflet/leaflet.component';
import { PartnerService } from '../../services/partner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private partnerService: PartnerService, private snackBar: MatSnackBar, private router: Router,
    private route: ActivatedRoute) { }

  onSubmit(form: FormGroup, leafletComponent: LeafletComponent) {
    if (form.valid) {
      leafletComponent.processMapData(form);
      this.partnerService.save(form.value).subscribe({
        next: () => {
          this.onSucess();
        },
        error: () => {
          this.onError();
        }
      });
    } else {
      this.onFormError();
    }
  }

  onSucess() {
    this.snackBar.open("Partner saved successfully!", '', { duration: 4000 });
  }

  onError() {
    this.snackBar.open("Error saving partner", '', { duration: 4000 });
  }

  onFormError() {
    this.snackBar.open("Incomplete form", '', { duration: 4000 });
  }

  onCancel() {
    this.router.navigate([''], { relativeTo: this.route });
  }
}
