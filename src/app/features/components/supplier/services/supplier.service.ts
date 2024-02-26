import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  componentMobileActivePopupName: Subject<string> = new Subject();
}
