import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-button-toggle-group',
  templateUrl: './button-toggle-group.component.html',
  styleUrls: ['./button-toggle-group.component.scss'],
})
export class ButtonToggleGroupComponent implements OnChanges {
  @Input() options: any[] = [];
  @Input() isMultipleSelection: string = 'false';
  @Input() isReadOnly = false;
  @Input() resetRequired: number = 0;
  @Output() toggleGroupSelection = new EventEmitter<any>();
  optionsFormControl = new UntypedFormControl('');

  ngOnChanges(changes: any) {
    if (changes.resetRequired) {
      this.optionsFormControl.reset();
      this.toggleGroupSelection.emit(false);
    }
  }

  onValChange(event: any) {
    this.toggleGroupSelection.emit(event.value);
  }
}
