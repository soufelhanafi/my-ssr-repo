import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeRo from '@angular/common/locales/ro';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular-ivy';

import { CookieInterceptor } from 'src/interceptors/cookie.interceptor';
import { BreakPointService } from 'src/service/break-point.service';
import { CookieService } from 'src/service/cookie.service';
import { CustomDateAdapter } from 'src/service/custom-date-adapter.service';
import { DataService } from 'src/service/data.service';

import { AngularMaterialItemsModule } from './angular-material-items.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { ReusableComponentsModule } from './reusable/reusable.module';
import { ViewModule } from './view/view.module';
import { SanityErrorLogger } from '@utils/SanityErrorLogger';

registerLocaleData(localeRo, 'ro');

@NgModule({
  declarations: [AppComponent],
  providers: [
    DataService,
    CookieService,
    BreakPointService,
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'ro-RO' },
    { provide: HTTP_INTERCEPTORS, useClass: CookieInterceptor, multi: true },
    provideClientHydration(),
    {
      provide: ErrorHandler,
      useClass: SanityErrorLogger,
      deps: [],
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    AngularMaterialItemsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    NavigationModule,
    ReusableComponentsModule,
    ViewModule,
  ],
})
export class AppModule {}
