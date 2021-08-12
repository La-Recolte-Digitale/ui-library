import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringHelpersService } from './services/string-helpers.service/string-helpers.service'

import { LaRecolteActionBarComponent } from './la-recolte-action-bar/la-recolte-action-bar.component';
import { LaRecolteNumberFieldComponent } from './la-recolte-number-field/la-recolte-number-field.component';
import { LaRecolteModalSelectComponent } from './la-recolte-modal-select/la-recolte-modal-select.component';

@NgModule({
  declarations: [
    LaRecolteActionBarComponent,
    LaRecolteNumberFieldComponent,
    LaRecolteModalSelectComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    StringHelpersService
  ],
  exports: [
    LaRecolteActionBarComponent,
    LaRecolteNumberFieldComponent,
    LaRecolteModalSelectComponent
  ]
})
export class LaRecolteUiModule {}
