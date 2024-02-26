import { Component, Input } from '@angular/core';

import { Banner } from 'src/model/common';

@Component({
  selector: 'app-banner-single',
  templateUrl: './banner-single.component.html',
  styleUrls: ['./banner-single.component.scss'],
})
export class BannerSingleComponent {
  @Input() banner: Banner | any = {};
}
