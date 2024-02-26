import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExploreComponent } from './view/explore/explore.component';
import { FavoritesComponent } from './view/favorites/favorites.component';
import { HomeComponent } from './view/home/home.component';
import { CookieComponent } from './view/policy/cookie/cookie.component';
import { PrivacyComponent } from './view/policy/privacy/privacy.component';
import { TermsAndConditionsComponent } from './view/policy/terms-and-conditions/terms-and-conditions.component';
import { UnderConstructionComponent } from './view/under-construction/under-construction.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'supplier',
    loadChildren: () =>
      import('./features/components/supplier/supplier.module').then((m) => m.SupplierModule),
  },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'termeni-si-conditii', component: TermsAndConditionsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'politica-confidentialitate', component: PrivacyComponent },
  { path: 'politica-cookie', component: CookieComponent },
  { path: '**', component: UnderConstructionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
