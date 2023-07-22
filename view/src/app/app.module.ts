import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { SeePartnersComponent } from './partners/see-partners/see-partners.component';
import { HomePartnersComponent } from './partners/home-partners/home-partners.component';
import { RegisterPartnerComponent } from './partners/register-partner/register-partner.component';
import { UpdatePartnerComponent } from './partners/update-partner/update-partner.component';
import { BestPartnersComponent } from './partners/best-partners/best-partners.component';
import { SeeBestPartnersComponent } from './partners/see-best-partners/see-best-partners.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; 
import {MatSnackBarModule } from '@angular/material/snack-bar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletComponent } from './map/leaflet/leaflet.component';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';


@NgModule({
  declarations: [
    AppComponent,
    SeePartnersComponent,
    HomePartnersComponent,
    RegisterPartnerComponent,
    UpdatePartnerComponent,
    BestPartnersComponent,
    SeeBestPartnersComponent,
    LeafletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    LeafletDrawModule
  ],
  providers: [LeafletComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
