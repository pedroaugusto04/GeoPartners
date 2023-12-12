import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormPartnerComponent } from './form-partner/form-partner.component';
import { BestPartnersComponent } from './best-partners/best-partners.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule } from '@angular/material/snack-bar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletComponent } from '../map/leaflet/leaflet.component';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    FormPartnerComponent,
    BestPartnersComponent,
    LeafletComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    LeafletModule,
    LeafletDrawModule,
  ]
})
export class PartnersModule { }
