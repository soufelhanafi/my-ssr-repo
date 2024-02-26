import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { APP_SETTINGS } from '@core/constants';

@Component({
  selector: 'app-calendar-unavailable',
  templateUrl: './calendar-unavailable.component.html',
  styleUrl: './calendar-unavailable.component.scss',
})
export class CalendarUnavailableComponent implements OnInit {
  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();

  currentMonth: string;
  monthAbbreviations = APP_SETTINGS.MONTHS_ABBREVIATIONS;

  ngOnInit(): void {
    const currentDate = new Date(Date.now());
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const formattedDate = `${this.monthAbbreviations[monthIndex]}${APP_SETTINGS.DOT_SEPARATOR}${year}`;

    this.currentMonth = formattedDate;
  }

  onButtonClick(): void {
    this.buttonClicked.emit();
  }
}
