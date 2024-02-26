import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SelectOption } from '@shared/models';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectInputComponent implements OnInit, ControlValueAccessor {
  @Input() tipEveniment: string;
  @Input() optionList: SelectOption[];
  @Input() formControlName: string;
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
