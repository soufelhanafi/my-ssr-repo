import {
  Component,
  Input,
  forwardRef,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent implements OnInit, ControlValueAccessor {
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
