import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'la-recolte-action-bar',
  template: `
    <div class="buttons-bottom">
      <ng-content></ng-content>
    </div>
    <div class="bottom-spacer"></div>
  `,
  styles: [`
    .buttons-bottom {
      white-space: nowrap;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      display: flex;
      background: white;
    }

    .buttons-bottom >>> button {
      display: flex;
      flex: 1;
      border-radius: 0 !important;
    }

    .buttons-bottom >>> button:not(:first-child) {
      border-left: 3px solid !important;
    }

    .bottom-spacer {
      height: 60px;
    }
  `]
})
export class LaRecolteActionBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
