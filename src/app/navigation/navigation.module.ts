import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BurgerMenuComponent } from './burger-menu/burger-menu.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { AngularMaterialItemsModule } from '../angular-material-items.module';

@NgModule({
  declarations: [NavigationMenuComponent, FooterComponent, BurgerMenuComponent],
  imports: [CommonModule, RouterModule, AngularMaterialItemsModule],
  exports: [NavigationMenuComponent, FooterComponent],
})
export class NavigationModule {}
