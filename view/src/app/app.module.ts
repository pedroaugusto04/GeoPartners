import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormPartnerComponent } from './partners/form-partner/form-partner.component';
import { BestPartnersComponent } from './partners/best-partners/best-partners.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletComponent } from './map/leaflet/leaflet.component';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './partners/home/home.component';
import {MatListModule} from  "@angular/material/list";
import { FlexLayoutModule } from '@angular/flex-layout';
import { SeePartnersComponent } from './see-partners/see-partners.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormPartnerComponent,
    BestPartnersComponent,
    LeafletComponent,
    SeePartnersComponent
  ],
  imports: [
    RouterModule.forRoot([], {
      bindToComponentInputs: true // <-- enable this feature
    }),
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
    LeafletDrawModule,
    MatListModule,
    FlexLayoutModule
  ],
  providers: [LeafletComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
