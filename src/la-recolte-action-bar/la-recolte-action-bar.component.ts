import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'la-recolte-action-bar',
  templateUrl: './la-recolte-action-bar.component.html',
  styleUrls: ['./la-recolte-action-bar.component.scss'],
})
export class LaRecolteActionBarComponent implements OnInit {
  @Input() absolute: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
