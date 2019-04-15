import { CommonModule } from '@angular/common';
import { NgModule, Injector } from '@angular/core';

import { LaRecolteActionBarComponent } from './la-recolte-action-bar/la-recolte-action-bar.component';

@NgModule({
  declarations: [LaRecolteActionBarComponent],
  imports: [CommonModule],
  exports: [LaRecolteActionBarComponent]
})
export class LaRecolteUiModule {}
