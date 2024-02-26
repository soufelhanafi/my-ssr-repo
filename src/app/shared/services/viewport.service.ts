import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export const CustomBreakpoints = {
  MobileOrTablet: '(max-width: 1023px)',
};

@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  isMobile$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.breakpointObserver
      .observe(CustomBreakpoints.MobileOrTablet)
      .pipe(map((result) => result.matches));
  }
}
