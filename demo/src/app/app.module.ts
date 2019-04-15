import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LaRecolteUiModule } from 'larecolte-ui';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LaRecolteUiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
