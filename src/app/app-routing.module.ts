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
import { AdminPanelAddWorkshopComponent } from "./admin-panel/admin-panel-workshop/admin-panel-add-workshop/admin-panel-add-workshop.component";
import { AdminPanelEditWorkshopComponent } from "./admin-panel/admin-panel-workshop/admin-panel-edit-workshop/admin-panel-edit-workshop.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { UserComponent } from "./user/user.component";
import { AdminPanelListAuthorComponent } from "./admin-panel/admin-panel-author/admin-panel-list-author/admin-panel-list-author.component";
import { AdminPanelAddAuthorComponent } from "./admin-panel/admin-panel-author/admin-panel-add-author/admin-panel-add-author.component";
import { AdminPanelEditAuthorComponent } from "./admin-panel/admin-panel-author/admin-panel-edit-author/admin-panel-edit-author.component";
import { AdminPanelListPublisherComponent } from "./admin-panel/admin-panel-publisher/admin-panel-list-publisher/admin-panel-list-publisher.component";
import { AdminPanelAddPublisherComponent } from "./admin-panel/admin-panel-publisher/admin-panel-add-publisher/admin-panel-add-publisher.component";
import { AdminPanelEditPublisherComponent } from "./admin-panel/admin-panel-publisher/admin-panel-edit-publisher/admin-panel-edit-publisher.component";

const routes: Routes = [
  { path : '', component: AccueilComponent },
  { path : 'accueil', component: AccueilComponent },

  { path: 'inscription', component: RegisterComponent },
  { path: 'connexion', component: LoginComponent },

  { path: 'livre', component: CatalogComponent },
  { path: 'livre/:idBook', component: BookComponent },

  { path: 'utilisateur', component: UserComponent },

  { path : 'catalogue', component: CatalogComponent },
  { path : 'calendar', component: CalendarComponent },

  { path: 'atelier/:idWorkshop', component:WorkshopComponent },
  { path: 'atelier', component: CalendarComponent },
  { path: 'ateliers', component: CalendarComponent },

  { path: 'admin', component: AdminPanelListBookComponent, canActivate: [AuthentGuard] },

  { path: 'admin/auteur', component: AdminPanelListAuthorComponent, canActivate: [AuthentGuard] },
  { path: 'admin/auteur/creer', component: AdminPanelAddAuthorComponent, canActivate: [AuthentGuard] },
  { path: 'admin/auteur/:idAuthor', component: AdminPanelEditAuthorComponent, canActivate: [AuthentGuard] },
  { path: 'admin/auteurs', component: AdminPanelListAuthorComponent, canActivate: [AuthentGuard] },

  { path: 'admin/editeur', component: AdminPanelListPublisherComponent, canActivate: [AuthentGuard] },
  { path: 'admin/editeurs', component: AdminPanelListPublisherComponent, canActivate: [AuthentGuard] },
  { path: 'admin/editeur/creer', component: AdminPanelAddPublisherComponent, canActivate: [AuthentGuard] },
  { path: 'admin/editeur/:idPublisher', component: AdminPanelEditPublisherComponent, canActivate: [AuthentGuard] },

  { path: 'admin/livres', component: AdminPanelListBookComponent, canActivate: [AuthentGuard] },
  { path: 'admin/livre', component: AdminPanelListBookComponent, canActivate: [AuthentGuard] },
  { path: 'admin/livre/creer', component: AdminPanelAddBookComponent, canActivate: [AuthentGuard] },
  { path: 'admin/livre/:idBook', component: AdminPanelEditBookComponent, canActivate: [AuthentGuard] },

  { path: 'admin/ateliers', component: AdminPanelListWorkshopComponent, canActivate: [AuthentGuard] },
  { path: 'admin/atelier', component: AdminPanelListWorkshopComponent, canActivate: [AuthentGuard] },
  { path: 'admin/atelier/creer', component: AdminPanelAddWorkshopComponent, canActivate: [AuthentGuard] },
  { path: 'admin/atelier/:idWorkshop', component: AdminPanelEditWorkshopComponent, canActivate: [AuthentGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
