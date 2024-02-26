import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss'],
})
export class BottomNavigationComponent {
  @Input() phone: string | undefined;
  @Input() displayCalendar: boolean = true;
  @Output() askAnOffer = new EventEmitter();
  @Output() checkTheCalendar = new EventEmitter();

  askOffer(): void {
    this.askAnOffer.emit();
  }

  checkCalendar(): void {
    this.checkTheCalendar.emit();
  }
}
