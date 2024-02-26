import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { APP_SETTINGS } from '@core/constants';

import { SupplierComponent } from './supplier-page';

const routes: Routes = [
  {
    path: APP_SETTINGS.EMPTY_LINE,
    component: SupplierComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule {}
