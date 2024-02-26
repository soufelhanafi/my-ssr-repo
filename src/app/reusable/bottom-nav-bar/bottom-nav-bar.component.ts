import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav-bar',
  templateUrl: './bottom-nav-bar.component.html',
  styleUrls: ['./bottom-nav-bar.component.scss'],
})
export class BottomNavBarComponent {
  prevScrollPos: number;
  constructor(public router: Router) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const currentScrollPos = window.scrollY;
    const item = document.getElementById('bottom-navbar');
    if (!item) {
      return;
    }
    if (this.prevScrollPos > currentScrollPos) {
      item.style.bottom = '0px';
    } else {
      item.style.bottom = '-85px';
    }
    this.prevScrollPos = currentScrollPos;
  }
}
