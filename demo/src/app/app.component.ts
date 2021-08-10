import { Component, ViewChild } from '@angular/core';
import { of } from 'rxjs';

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
  isSearchItemsOpened = false;
  products$ = of([{ name: 'Product1', id: '1' }, { name: 'Product2', id: '2' }]);
  productsLoading$ = of(false);

  @ViewChild('testInput') testInput;

  focusInput() {
    this.testInput.setFocus();
  }

  onEvent(name, evt) {
    console.log(name, evt)
  }

  addProducts(evt) {
    console.log(evt);
  }
}
