import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  toFixed = 3;
  showAllDecimals = false;
  step = 10;
  min = -2;
  max = 70;
  placeholder = '';
  inputTest = {
    value: 0.099999999
  };

  @ViewChild('testInput') testInput;

  focusInput() {
    this.testInput.setFocus();
  }

  onEvent(name, evt) {
    console.log(name, evt)
  }
}
