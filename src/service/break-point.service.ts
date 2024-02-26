import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export const CustomBreakpoints = {
  Medium: '(min-width: 600px) and (max-width: 959px)',
  Large: '(min-width: 960px) and (max-width: 1279px)',
  ExtraLarge: '(min-width: 1280px)',
  Mobile: '(max-width: 905px)',
};

@Injectable({
  providedIn: 'root',
})
export class BreakPointService {
  public isMobile$;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.breakpointObserver
      .observe(CustomBreakpoints.Mobile)
      .pipe(map((result) => result.matches));
  }
}
