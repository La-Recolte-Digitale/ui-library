import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';
  toFixed = 0;
  step = 1;
  min = -2;
  max = 7;
  placeholder = '';
  inputTest = {
    value: 5
  };

  @ViewChild('testInput') testInput;

  focusInput() {
    this.testInput.setFocus();
  }

  onEvent(name, evt) {
    console.log(name, evt)
  }
}
