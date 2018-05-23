import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from "./catalog/catalog.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path : 'catalogue', component: CatalogComponent},
  {path : '', component: AccueilComponent},
  {path: 'register', component:RegisterComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
