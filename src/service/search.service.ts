import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _searchObject: EventEmitter<any> = new EventEmitter();
  private _filterObject: EventEmitter<any> = new EventEmitter();
  searchFormGroup: EventEmitter<any> = new EventEmitter();
  askoffer: EventEmitter<any> = new EventEmitter();

  emitSearchFormGroup(obj: any) {
    this.searchFormGroup.emit(obj);
  }

  openAskOffer(data?: any) {
    this.askoffer.emit(data);
  }

  getSearchFormGroupEmitter() {
    return this.searchFormGroup;
  }

  emitSearchObject(obj: any) {
    const objSimplified = this.removeFalseValues(obj);
    this._searchObject.emit(objSimplified);
  }

  getSearchObjectEmitter() {
    return this._searchObject;
  }

  emitFilterObject(obj: any) {
    const objSimplified = this.removeFalseValues(obj);
    this._filterObject.emit(objSimplified);
  }

  getFilterObjectEmitter() {
    return this._filterObject;
  }

  removeFalseValues(obj: any) {
    let m: any = {};
    Object.keys(obj).forEach((x) => {
      if (typeof obj[x] === 'object') {
        m[x] = this.removeFalseValues(obj[x]);
      } else if (obj[x] !== false && obj[x] !== '') {
        m[x] = obj[x];
      }
    });
    return m;
  }
}
