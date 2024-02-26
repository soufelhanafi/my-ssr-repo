import { ChangeDetectorRef, Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() formControlName: string;
  @Input() iconName: string;
  @Input() parentForm: FormGroup;

  formControl: FormControl;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.formControl = this.parentForm.get(this.formControlName) as FormControl;
  }

  writeValue(): void {
    this.cd.markForCheck();
  }

  registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  _onChange = (_: string | number): void => {};

  _onTouched = (): void => {};
}
