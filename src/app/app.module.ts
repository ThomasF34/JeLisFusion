import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';


import {LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {DateTimeAdapter, OWL_DATE_TIME_LOCALE} from 'ng-pick-datetime';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import { AppComponent } from './app.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { AccueilComponent } from './accueil/accueil.component';
import { RegisterComponent } from './register/register.component';
import { BookComponent } from './book/book.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdminPanelListBookComponent } from './admin-panel/admin-panel-book/admin-panel-list-book/admin-panel-list-book.component';
import { AdminPanelAddBookComponent } from './admin-panel/admin-panel-book/admin-panel-add-book/admin-panel-add-book.component';
import { AdminPanelEditBookComponent } from './admin-panel/admin-panel-book/admin-panel-edit-book/admin-panel-edit-book.component';
import { LoginComponent } from './login/login.component';
import {AuthentGuard} from "./authent.guard";
import {TokenInterceptorService} from "./share/service/token-interceptor.service";
import { AdminPanelListWorkshopComponent } from './admin-panel/admin-panel-workshop/admin-panel-list-workshop/admin-panel-list-workshop.component';
import { AdminPanelNavbarComponent } from './admin-panel/admin-panel-navbar/admin-panel-navbar.component';
import { AdminPanelAddWorkshopComponent } from './admin-panel/admin-panel-workshop/admin-panel-add-workshop/admin-panel-add-workshop.component';
import { AdminPanelEditWorkshopComponent } from './admin-panel/admin-panel-workshop/admin-panel-edit-workshop/admin-panel-edit-workshop.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {NativeDateTimeAdapter} from "ng-pick-datetime/date-time/adapter/native-date-time-adapter.class";

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
    AdminPanelListBookComponent,
    AdminPanelAddBookComponent,
    AdminPanelEditBookComponent,
    LoginComponent,
    AdminPanelListWorkshopComponent,
    AdminPanelNavbarComponent,
    AdminPanelAddWorkshopComponent,
    AdminPanelEditWorkshopComponent
  ],
  imports: [
    BrowserModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot()
],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    AuthentGuard,
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'},
    { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE]},
    { provide : HTTP_INTERCEPTORS, useClass : TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

