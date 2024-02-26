import { Component, Input } from '@angular/core';

import { Wedding } from 'src/model/wedding';

@Component({
  selector: 'app-wedding-card',
  templateUrl: './wedding-card.component.html',
  styleUrls: ['./wedding-card.component.scss'],
})
export class WeddingCardComponent {
  @Input() weddingDetails: Wedding | any = {};
}
