import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';


import {LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppComponent } from './app.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { AccueilComponent } from './accueil/accueil.component';
import { RegisterComponent } from './register/register.component';
import { BookComponent } from './book/book.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminPanelListBookComponent } from './admin-panel/admin-panel-list-book/admin-panel-list-book.component';
import { AdminPanelAddBookComponent } from './admin-panel/admin-panel-book/admin-panel-add-book/admin-panel-add-book.component';
import { AdminPanelEditBookComponent } from './admin-panel/admin-panel-book/admin-panel-edit-book/admin-panel-edit-book.component';
import { LoginComponent } from './login/login.component';
import {AuthentGuard} from "./authent.guard";
import {TokenInterceptorService} from "./share/service/token-interceptor.service";

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CatalogComponent,
    AccueilComponent,
    RegisterComponent,
    BookComponent,
    WorkshopComponent,
    CalendarComponent,
    AdminPanelComponent,
    AdminPanelListBookComponent,
    AdminPanelAddBookComponent,
    AdminPanelEditBookComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    AuthentGuard,
    { provide : HTTP_INTERCEPTORS, useClass : TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

