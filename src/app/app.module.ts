import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from "./navbar/navbar.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { AccueilComponent } from './accueil/accueil.component';


import {LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { RegisterComponent } from './register/register.component';
import { BookComponent } from './book/book.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { CalendarComponent } from './calendar/calendar.component';

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
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

