import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from "./catalog/catalog.component";
import { AccueilComponent } from "./accueil/accueil.component";
import { RegisterComponent } from "./register/register.component";
import { BookComponent } from "./book/book.component";
import { WorkshopComponent } from "./workshop/workshop.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {AdminPanelBookComponent} from "./admin-panel/admin-panel-book/admin-panel-book.component";
import {AdminPanelListBookComponent} from "./admin-panel/admin-panel-list-book/admin-panel-list-book.component";
import {AdminPanelAddBookComponent} from "./admin-panel/admin-panel-book/admin-panel-add-book/admin-panel-add-book.component";

const routes: Routes = [
  {path : 'catalogue', component: CatalogComponent},
  {path : '', component: AccueilComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'book', component: CatalogComponent},
  {path: 'book/:idBook', component: BookComponent},
  {path: 'workshop/:idWkshp', component: WorkshopComponent},
  {path: 'admin', component: AdminPanelListBookComponent},
  {path: 'admin/livres', component: AdminPanelListBookComponent},
  {path: 'admin/livre', component: AdminPanelListBookComponent},
  {path: 'admin/livre/creer', component: AdminPanelAddBookComponent},
  {path: 'admin/livre/:idBook', component: AdminPanelBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
