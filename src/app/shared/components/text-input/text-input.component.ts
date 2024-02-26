import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() formControlName: string;
  @Input() iconName: string;
  @Input() parentForm: FormGroup;
  @Input() maxLength: number;

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
