import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  public setCookie: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public updateCookie = this.setCookie.asObservable();
}
