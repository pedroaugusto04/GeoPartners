import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPartnerComponent } from './partners/form-partner/form-partner.component';
import { BestPartnersComponent } from './partners/best-partners/best-partners.component';
import {HomeComponent} from './partners/home/home.component';
import { SeePartnersComponent } from './see-partners/see-partners.component';
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component:HomeComponent},
  { path: 'partners',component: SeePartnersComponent},
  { path: 'partners/new', component: FormPartnerComponent, data: {title:"Create Partner", formType: "create_form", buttonTitle: "Save"}},
  { path: 'partners/update/:id', component: FormPartnerComponent, data: {title: "Update Partner", formType: "update_form", buttonTitle: "Update" }},
  { path: 'partners/best', component: BestPartnersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  