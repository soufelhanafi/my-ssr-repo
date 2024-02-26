import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-more-less',
  templateUrl: './show-more-less.component.html',
  styleUrls: ['./show-more-less.component.scss'],
})
export class ShowMoreLessComponent {
  @Input() text: string;
  @Input() wordLimit: number;

  public showMore: boolean;

  constructor() {
    this.showMore = false;
  }

  showLessContent() {
    this.showMore = false;
    window.scrollTo(0, 0);
  }
}
