import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent {
  businessWebSite = environment.businessWebSite;
  client360WebSite = environment.client360WebSite;

  public goToLink(link: string): void {
    window.open(link, '_self');
  }
}
