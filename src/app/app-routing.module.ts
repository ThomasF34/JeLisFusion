import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from "./catalog/catalog.component";
import { AccueilComponent } from "./accueil/accueil.component";
import { RegisterComponent } from "./register/register.component";
import { BookComponent } from "./book/book.component";
import { WorkshopComponent } from "./workshop/workshop.component";
import { AdminPanelListBookComponent } from "./admin-panel/admin-panel-book/admin-panel-list-book/admin-panel-list-book.component";
import { AdminPanelAddBookComponent } from "./admin-panel/admin-panel-book/admin-panel-add-book/admin-panel-add-book.component";
import { AdminPanelEditBookComponent } from "./admin-panel/admin-panel-book/admin-panel-edit-book/admin-panel-edit-book.component";
import { LoginComponent } from "./login/login.component";
import { AuthentGuard } from "./authent.guard";
import { AdminPanelListWorkshopComponent } from "./admin-panel/admin-panel-workshop/admin-panel-list-workshop/admin-panel-list-workshop.component";
import {AdminPanelAddWorkshopComponent} from "./admin-panel/admin-panel-workshop/admin-panel-add-workshop/admin-panel-add-workshop.component";
import {AdminPanelEditWorkshopComponent} from "./admin-panel/admin-panel-workshop/admin-panel-edit-workshop/admin-panel-edit-workshop.component";
import {CalendarComponent} from "./calendar/calendar.component";

const routes: Routes = [
  {path : '', component: AccueilComponent},
  {path : 'accueil', component: AccueilComponent},

  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},

  {path: 'book', component: CatalogComponent},
  {path: 'book/:idBook', component: BookComponent},

  {path : 'catalogue', component: CatalogComponent},
  {path : 'calendar', component: CalendarComponent},

  {path: 'atelier/:idWorkshop', component:WorkshopComponent},
  {path: 'atelier', component: CalendarComponent},
  {path: 'ateliers', component: CalendarComponent},

  {path: 'admin', component: AdminPanelListBookComponent, canActivate: [AuthentGuard]},
  {path: 'admin/livres', component: AdminPanelListBookComponent, canActivate: [AuthentGuard]},
  {path: 'admin/livre', component: AdminPanelListBookComponent, canActivate: [AuthentGuard]},
  {path: 'admin/livre/creer', component: AdminPanelAddBookComponent, canActivate: [AuthentGuard]},
  {path: 'admin/livre/:idBook', component: AdminPanelEditBookComponent, canActivate: [AuthentGuard]},

  {path: 'admin/ateliers', component: AdminPanelListWorkshopComponent, canActivate: [AuthentGuard]},
  {path: 'admin/atelier', component: AdminPanelListWorkshopComponent, canActivate: [AuthentGuard]},
  {path: 'admin/atelier/creer', component: AdminPanelAddWorkshopComponent, canActivate: [AuthentGuard]},
  {path: 'admin/atelier/:idWorkshop', component: AdminPanelEditWorkshopComponent, canActivate: [AuthentGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
