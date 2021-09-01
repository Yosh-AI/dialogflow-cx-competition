import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { AppRoutingModule } from './/app-routing.module';

import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module

  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: XhrinterceptorService, multi: true}
     ],

  bootstrap: [AppComponent]
})
export class AppModule { }
