import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LeafletComponent } from 'src/app/map/leaflet/leaflet.component';
import { CreateService } from './services/create.service';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'app-form-partner',
  templateUrl: './form-partner.component.html',
  styleUrls: ['./form-partner.component.scss']
})
export class FormPartnerComponent implements OnInit {

  form!: FormGroup;
  @ViewChild(LeafletComponent) leafletComponent!: LeafletComponent;
  @Input() title?: string;
  @Input() formType?: string; // create_form / update_form
  @Input() buttonTitle?: string;
  id?: string;
  formServiceMode: any;

  constructor(private formBuilder: NonNullableFormBuilder, private route: ActivatedRoute, private createService: CreateService,
     private updateService: UpdateService) { }

  ngOnInit() {
    if (this.formType === 'create_form') {
      this.formServiceMode = this.createService;
      this.form = this.formBuilder.group({
        document: ['', [Validators.required]],
        ownerName: ['', [Validators.required]],
        tradingName: ['', [Validators.required]],
        address: [''],
        coverageArea: ['']
      });
    } else if (this.formType === 'update_form') {
      this.formServiceMode = this.updateService;
      this.id = this.route.snapshot.paramMap.get('id') || '';
      this.form = this.formBuilder.group({
        document: [this.id],
        ownerName: ['', [Validators.required]],
        tradingName: ['', [Validators.required]],
        address: [''],
        coverageArea: ['']
      });

    }
  }

  onSubmit(form: FormGroup) {
    this.formServiceMode.onSubmit(form, this.leafletComponent);
  }

  onCancel() {
    this.formServiceMode.onCancel();
  }

  formErrorMessage() {
    return 'Field required';
  }
}

