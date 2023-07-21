import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePartnersComponent } from './home-partners/home-partners.component';
import { RegisterPartnerComponent } from './register-partner/register-partner.component';
import { UpdatePartnerComponent } from './update-partner/update-partner.component';
import { BestPartnersComponent } from './best-partners/best-partners.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SeePartnersComponent } from './see-partners/see-partners.component';
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



@NgModule({
  declarations: [
    SeePartnersComponent,
    HomePartnersComponent,
    RegisterPartnerComponent,
    UpdatePartnerComponent,
    BestPartnersComponent,
    LeafletComponent
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
    LeafletModule
  ]
})
export class PartnersModule { }
