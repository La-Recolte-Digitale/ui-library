import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'la-recolte-number-field',
  templateUrl: './la-recolte-number-field.component.html',
  styleUrls: ['./la-recolte-number-field.component.scss'],
  providers: []
})
export class LaRecolteNumberFieldComponent implements OnInit {
  @Input() toFixed: number = 0;
  @Input() parent: Object;
  @Input() property: string;
  @Input() placeholder: string;
  @Input() min: number = Number.MIN_SAFE_INTEGER;
  @Input() max: number = Number.MAX_SAFE_INTEGER;
  @Input() step: number = 1;
  @Input() readonly: boolean = false;
  @Input() value: any = 1;

  @Output() readonly change = new EventEmitter();
  @Output() readonly focus = new EventEmitter();
  @Output() readonly blur = new EventEmitter();
  @Output() readonly keyup = new EventEmitter();
  @Output() readonly keydown = new EventEmitter();
  @Output() readonly keypress = new EventEmitter();

  @ViewChild('numberInput', { static: false }) numberInput: ElementRef;

  setFocus(): void {
    setTimeout(() => this.numberInput.nativeElement.focus());
  }

  ngOnInit() {
  }

  checkValue() {
    let sVal = this.numberInput.nativeElement.value;
    let parsed = parseFloat(sVal && sVal.replace(/,/g, '.'));
    let val: number = <number>((parsed || parsed === 0) ? parsed : null);
    if (val || val === 0) {
      if (val < this.min) {
        this.setValue(this.min);
      } else {
        if (val > this.max) {
          this.setValue(this.max);
        } else {
          this.updateToFixed(val);
        }
      }
    } else {
      this.setValue(null);
    }
  }

  private setValue(val: number | null) {
    this.value = val;
    this.numberInput.nativeElement.value = (val || val === 0) ? val : '';
    this.updateParent(val);
  }

  private updateToFixed(val: number) {
    if (val.toFixed(this.toFixed).length < val.toString().length) {
      val = parseFloat(val.toFixed(this.toFixed));
    }
    this.setValue(val);
  }

  private updateParent(val: number | null) {
    if (this.parent && this.property) {
      this.parent[this.property] = val;
    }
  }

  onKeyPress(e: any): void {
    if ((e.which < 44 && e.which !== 13) || e.which === 47 || (e.which > 57 && e.which !== 101)){ e.preventDefault() }
  }

  changeStep(positive: boolean): void {
    this.setValue(parseFloat(this.value) + (positive ? this.step : - this.step));
    this.checkValue();
  }
}
