import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss'],
})
export class BurgerMenuComponent {
  showDropdown = false;
  businessWebSite = environment.businessWebSite;
  client360WebSite = environment.client360WebSite;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(link: string) {
    window.open(link, '_self');
    this.showDropdown = false;
  }
}
