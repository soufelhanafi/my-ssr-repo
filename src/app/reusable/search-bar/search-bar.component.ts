import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { isMobile } from 'src/service/isMobile';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnChanges {
  @Input() locationInputValue = '';
  @Input() dateInputValue = '';
  @Output() showFiltersEvent = new EventEmitter<string>();
  @Output() showSearchEvent = new EventEmitter<string>();
  isMobile = isMobile();
  searchQuery = '';

  ngOnChanges() {
    if (this.locationInputValue || this.dateInputValue) {
      this.searchQuery = `${this.locationInputValue}, ${this.dateInputValue}`;
    }
  }
}
