import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { G6Module } from './g6.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    G6Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
