import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { APP_SETTINGS } from '@core/constants';

@Component({
  selector: 'app-supplier-rating-box',
  templateUrl: './supplier-rating-box.component.html',
  styleUrl: './supplier-rating-box.component.scss',
})
export class SupplierRatingBoxComponent implements OnInit, AfterViewInit {
  @Input() ratingValue: number = APP_SETTINGS.RATING.RATING_VALUE;
  @Input() ratingDisplay: boolean = APP_SETTINGS.RATING.RATING_DISPLAY;
  @Input() starWidth: string = APP_SETTINGS.RATING.STAR_WIDTH;
  @Input() ratingFontSize: string = APP_SETTINGS.RATING.RATING_FONT_SIZE;
  @ViewChild('starElement') starElement: ElementRef;

  stars: string[] = [];
  raitingpercent: string = APP_SETTINGS.EMPTY_LINE;

  ngOnInit(): void {
    this.raitingpercent = ((this.ratingValue / 5) * 100).toString() + '%';
  }

  ngAfterViewInit(): void {
    this.setStarElementStyles();
  }

  private setStarElementStyles(): void {
    const startHtmlElement = this.starElement.nativeElement;

    startHtmlElement.style.background = `
      linear-gradient(90deg, gold ${this.raitingpercent}, rgba(0, 0, 0, 0.2) ${this.raitingpercent})`;
    startHtmlElement.style.webkitBackgroundClip = 'text';
    startHtmlElement.style.webkitTextFillColor = 'transparent';
    startHtmlElement.style.display = 'inline';
    startHtmlElement.style.color = 'rgba(0, 0, 0, 0.2)';
    startHtmlElement.style.fontSize = this.starWidth;
  }
}
