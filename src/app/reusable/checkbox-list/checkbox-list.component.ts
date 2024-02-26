import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';

import { isMobile } from 'src/service/isMobile';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss'],
})
export class CheckboxListComponent implements OnInit, OnChanges {
  @Input() listItems: any[] = [];
  @Input() listType: any = 'checkbox';
  @Input() isReadOnly = false;
  @Input() resetRequired: number = 0;
  @Output() checkboxSelection = new EventEmitter<any>();

  selectedItems: any;
  showAll = false;
  isMobile = isMobile();
  selected: number;

  constructor(private _formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
    this.buildFormGroup();
    this.onCheckboxChange();
  }

  buildFormGroup() {
    let typeObj = {} as any;
    this.listItems.forEach((elem: any) => {
      typeObj[elem.id] = new UntypedFormControl({ value: elem.value, disabled: this.isReadOnly });
    });
    this.selectedItems = this._formBuilder.group(typeObj);
  }

  ngOnChanges(changes: any) {
    if (changes.resetRequired) {
      this.buildFormGroup();
      this.checkboxSelection.emit(false);
    }
  }

  onCheckboxChange(): void {
    this.selectedItems.valueChanges.subscribe(() => {
      this.checkboxSelection.emit(this.selectedItems.value);
    });
  }
}
