import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeePartnersComponent } from './partners/see-partners/see-partners.component';
import { RegisterPartnerComponent } from './partners/register-partner/register-partner.component';
import { UpdatePartnerComponent } from './partners/update-partner/update-partner.component';
import { HomePartnersComponent } from './partners/home-partners/home-partners.component';
import { BestPartnersComponent } from './partners/best-partners/best-partners.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomePartnersComponent},
  { path: 'partners', component: SeePartnersComponent},
  { path: 'partners/new', component: RegisterPartnerComponent},
  { path: 'places/update/:id', component: UpdatePartnerComponent},
  { path: 'partners/best', component: BestPartnersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  