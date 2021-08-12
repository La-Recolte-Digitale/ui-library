import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DEFAUL_BUTTON_CLASS = 'is-danger';

@Component({
  selector: 'la-recolte-number-field',
  templateUrl: './la-recolte-number-field.component.html',
  styleUrls: ['./la-recolte-number-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: LaRecolteNumberFieldComponent
    }
  ]
})
export class LaRecolteNumberFieldComponent implements ControlValueAccessor, OnInit {
  touched = false;
  disabled = false;
  private _value: any = null;
  valueStr: string;
  @Input() buttonClass: string = DEFAUL_BUTTON_CLASS;
  @Input() toFixed: number = 0;
  @Input() showAllDecimals: string;
  @Input() placeholder: string;
  @Input() min: number = Number.MIN_SAFE_INTEGER;
  @Input() max: number = Number.MAX_SAFE_INTEGER;
  @Input() step: number = 1;
  @Input() eps: number = 0.0001;
  @Input() readonly: boolean = false;
  @Input() disabledMinus: boolean = false;
  @Input() disabledPlus: boolean = false;
  @Input() get value(): any {
    return (this._value || this._value === 0) ? this._value : null;
  }
  set value(value: any) {
    this._value = (value || value === 0) ? value : null;
    this.valueStr = (value || value === 0) ? 
      (this.showAllDecimals ? value.toFixed(this.toFixed) : value.toString()) : '';
    if (!this.numberInput) { return };
    this.numberInput.nativeElement.value = this.valueStr;
  }

  @Output() readonly valueChange = new EventEmitter();
  @Output() readonly change = new EventEmitter();
  @Output() readonly focus = new EventEmitter();
  @Output() readonly blur = new EventEmitter();
  @Output() readonly keyup = new EventEmitter();
  @Output() readonly keydown = new EventEmitter();
  @Output() readonly keypress = new EventEmitter();

  @ViewChild('numberInput', { static: false }) numberInput: ElementRef;

  setFocus(): void {
    if (!this.numberInput) { return };
    setTimeout(() => this.numberInput.nativeElement.focus());
  }

  ngOnInit() {
    this.checkValue();
  }

  checkValue(evt?: any) {
    if (!this.numberInput) { return };
    let sVal = this.numberInput.nativeElement.value;
    let parsed = parseFloat(sVal && sVal.replace(/,/g, '.'));
    let val: number = <number>((parsed || parsed === 0) ? parsed : null);
    if (val || val === 0) {
      if (val < this.min) {
        this.setValue(parseFloat(this.min.toString()));
      } else {
        if (val > this.max) {
          this.setValue(parseFloat(this.max.toString()));
        } else {
          this.updateToFixed(val);
        }
      }
    } else {
      this.setValue(null);
    }
    if (evt) {
      setTimeout(() => this.change.emit(evt));
    }
  }

  onChange = (value: any) => { };

  onTouched = () => { };

  writeValue(quantity: any) { this.value = quantity }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
    this.readonly = disabled;
  }

  private setValue(val: number | null) {
    this.value = val ? this.getCorrectedNumber(val) : val;
    this.valueChange.emit(val);
    this.onChange(val);
  }

  private updateToFixed(val: number) {
    if (val.toFixed(this.toFixed).length < val.toString().length) {
      val = parseFloat(val.toFixed(this.toFixed));
    }
    this.setValue(val);
  }

  private getCorrectedNumber(num: number): number {
    if (num && Math.abs(num) < this.eps) {
      num = 0;
    }
    return num;
  }

  private getRemains(value: number): number {
    if (!value) {
      return 0;
    }
    const correction = Math.pow(10, this.toFixed);
    return (Math.round(this.parsedNumber(value) * correction) % Math.round(this.parsedNumber(this.step) * correction)) / correction;
  }

  private parsedNumber(num: number): number {
    return parseFloat(num.toString())
  }

  onKeyPress(e: any): void {
    if ((e.which < 44 && e.which !== 13) || e.which === 47 || (e.which > 57 && e.which !== 101)){ e.preventDefault() }
  }

  changeStep(positive: boolean): void {
    const parsedValue = this.getCorrectedNumber(parseFloat(this.value) || 0);
    const remains = this.getCorrectedNumber(this.getRemains(parsedValue));
    let step = this.parsedNumber(positive ? this.step : - this.step);

    if (positive && parsedValue >= 0 || !positive && parsedValue < 0) {
      step = step - remains
    } else {
      step = remains ? - remains : step
    }

    this.setValue(parsedValue + step);
    if (!this.numberInput) { return };
    this.checkValue({ target: this.numberInput.nativeElement });
  }

  onFocus(evt: any): void {
    if (this._value === 0) evt.target.select();
    this.focus.emit(evt);
  }
}
