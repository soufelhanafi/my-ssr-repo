import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-card',
  templateUrl: './img-card.component.html',
  styleUrls: ['./img-card.component.scss'],
})
export class ImgCardComponent {
  @Input() imgPath: string = '';
  @Input() title: string = '';
  @Input() link: string = '';
}
