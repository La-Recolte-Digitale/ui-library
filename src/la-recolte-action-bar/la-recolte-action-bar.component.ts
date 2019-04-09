import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'la-recolte-action-bar',
  template: `
    <div class="buttons-bottom" [style.position]="absolute ? 'absolute' : 'fixed'">
      <ng-content></ng-content>
    </div>
    <div class="bottom-spacer"></div>
  `,
  styles: [`
    .buttons-bottom {
      white-space: nowrap;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      display: flex;
      background: white;
      z-index: 1;
    }

    .buttons-bottom >>> button {
      display: flex;
      flex: 1;
      border-radius: 0 !important;
    }

    .buttons-bottom >>> button:not(:first-child) {
      margin-left: 3px !important;
      box-shadow: none !important;
    }

    .bottom-spacer {
      height: 54px;
    }
  `]
})
export class LaRecolteActionBarComponent implements OnInit {
  @Input() absolute: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
