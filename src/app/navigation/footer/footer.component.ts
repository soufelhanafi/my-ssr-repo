import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  businessWebSite = environment.businessWebSite;
  client360WebSite = environment.client360WebSite;

  public goToLink(link: string): void {
    window.open(link, '_blank');
  }
}
