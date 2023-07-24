import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePartnersComponent } from './partners/table-partners/table-partners.component';
import { FormPartnerComponent } from './partners/form-partner/form-partner.component';
import { HomePartnersComponent } from './partners/home-partners/home-partners.component';
import { BestPartnersComponent } from './partners/best-partners/best-partners.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomePartnersComponent},
  { path: 'partners', component: TablePartnersComponent, data: {title:"Partners", displayedColumns: ['id', 'ownerName', 'tradingName','document','actions'],
  tableType: "default"}},
  { path: 'partners/new', component: FormPartnerComponent, data: {title:"Create Partner", formType: "create_form", buttonTitle: "Save"}},
  { path: 'partners/update/:id', component: FormPartnerComponent, data: {title: "Update Partner", formType: "update_form", buttonTitle: "Update" }},
  { path: 'partners/best', component: BestPartnersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  