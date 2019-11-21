import { CommonModule } from '@angular/common';
import { NgModule, Injector } from '@angular/core';

import { LaRecolteActionBarComponent } from './la-recolte-action-bar/la-recolte-action-bar.component';
import { LaRecolteNumberFieldComponent } from './la-recolte-number-field/la-recolte-number-field.component';

@NgModule({
  declarations: [
    LaRecolteActionBarComponent,
    LaRecolteNumberFieldComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [
    LaRecolteActionBarComponent,
    LaRecolteNumberFieldComponent,
  ]
})
export class LaRecolteUiModule {}
