import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Supplier } from 'src/model/supplier';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public updateFavorites: BehaviorSubject<{ id: string; isFavorite: boolean } | null> =
    new BehaviorSubject<{ id: string; isFavorite: boolean } | null>(null);

  eventTypeData: { id: string; name: string }[] = [];
  constructor(
    private http: HttpClient,
    private readonly router: Router,
  ) {
    this.initEnumConfig();
  }

  initEnumConfig() {
    const lsData = localStorage.getItem('enumConfigData');
    if (lsData) {
      const data = JSON.parse(lsData);
      this.eventTypeData = this.getEnumConfigData('eventType', data);
    } else {
      const params = new HttpParams().set('fields', 'eventType');
      this.http
        .get<{
          data: { name: string; valueType: string; value: any[] }[];
          message: '';
        }>(`${environment.s1Api}enumConfig`, { params: params })
        .subscribe((resp) => {
          if (resp.data) {
            localStorage.setItem('enumConfigData', JSON.stringify(resp.data));
            this.eventTypeData = this.getEnumConfigData('eventType', resp.data);
          }
        });
    }
  }

  private getEnumConfigData(
    name: string,
    data: { name: string; valueType: string; value: string[] }[],
  ) {
    const val = data.find((x) => x.name == name);
    if (val) return val.valueType == 'object' ? val.value.map((x) => JSON.parse(x)) : val?.value;
    else return [];
  }

  private buildHttpParams(params: any, data: any, currentPath: string) {
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof Object) {
        this.buildHttpParams(params, data[key], `${currentPath}${key}.`);
      } else {
        params[`${currentPath}${key}`] = data[key];
      }
    });
  }

  public mapSupplierList(list: any) {
    return list.map((elem: any) => {
      return {
        // eslint-disable-next-line no-underscore-dangle
        id: elem._id,
        name: elem.title,
        city: elem.city,
        county: elem.county,
        rating: 4.8,
        capacityMax: elem.capacityMax,
        capacityMin: elem.capacityMin,
        available: elem.available,
        freeDates: elem.freeDates,
        proposedDates: elem.proposedDates,
        isFavorite: elem.isFavorite,
        imgPath: elem?.mediaPhotos[0]?.linkSrc ?? '../../../../../assets/test-supplier-image.svg',
      };
    });
  }

  getPrestigeBallRooms() {
    const url = `${environment.backendApi}supplier/prestige-ballrooms`;
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then(
          (res: any) => {
            if (res && res.data) {
              resolve(this.mapSupplierList(res.data));
            }
          },
          (res: any) => {
            console.log(res);
            if (res && res.error && res.error.message == 'Data not found') {
              resolve([]);
            }
            reject('server call failed or response not proper');
          },
        );
    });
    return promise;
  }

  getPrestigeMusicBands() {
    const url = `${environment.backendApi}supplier/prestige-music-bands`;
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then(
          (res: any) => {
            if (res && res.data) {
              resolve(this.mapSupplierList(res.data));
            }
          },
          (res: any) => {
            console.log(res);
            if (res && res.error && res.error.message == 'Data not found') {
              resolve([]);
            }
            reject('server call failed or response not proper');
          },
        );
    });
    return promise;
  }

  getPrestigePhotographers() {
    const url = `${environment.backendApi}supplier/prestige-photographers`;
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then(
          (res: any) => {
            if (res && res.data) {
              resolve(this.mapSupplierList(res.data));
            }
          },
          (res: any) => {
            console.log(res);
            if (res && res.error && res.error.message == 'Data not found') {
              resolve([]);
            }
            reject('server call failed or response not proper');
          },
        );
    });
    return promise;
  }

  getPrestigeOtherServices() {
    const url = `${environment.backendApi}supplier/prestige-other-services`;
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then(
          (res: any) => {
            if (res && res.data) {
              resolve(this.mapSupplierList(res.data));
            }
          },
          (res: any) => {
            console.log(res);
            if (res && res.error && res.error.message == 'Data not found') {
              resolve([]);
            }
            reject('server call failed or response not proper');
          },
        );
    });
    return promise;
  }

  getCityData(userInput: string) {
    let params = new HttpParams({ fromObject: { nume: userInput } });

    const url = `${environment.backendApi}form-data/city-data`;
    // const url = 'assets/data/cityData.json';
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(url, { params: params })
        .toPromise()
        .then((res: any) => {
          if (res) {
            resolve(res);
          }
          reject('server call failed or response not proper');
        });
    });
    return promise;
  }

  getAllCityData() {
    const url = `${environment.backendApi}form-data/city-data/all`;
    let promise = new Promise((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then((res: any) => {
          if (res) {
            resolve(res);
          }
          reject('server call failed or response not proper');
        });
    });
    return promise;
  }

  getSuppliers(params?: any) {
    // const url = 'assets/data/workCenter.json';

    console.log('params', params);
    const url = `${environment.backendApi}supplier/`;
    let promise = new Promise((resolve) => {
      this.http
        .get(url, { params: params })
        .toPromise()
        .then(
          (res: any) => {
            if (res.data) {
              resolve(this.mapSupplierList(res.data));
            } else {
              resolve([res]);
            }
          },
          // (res: any) => {
          //   console.log(res);
          //   if (res && res.error && res.error.message == "Data not found") {
          //     resolve([]);
          //   }
          //   reject("server call failed or response not proper");
          // }
          // },
        );
    });
    return promise;
  }

  public prepareHttpParams(paramsObj: any) {
    let params = {};
    if (paramsObj && paramsObj.businessServiceType && paramsObj.businessServiceType == 'Local') {
      delete paramsObj.countyListed;
    }
    if (paramsObj && paramsObj.businessServiceType && paramsObj.businessServiceType !== 'Local') {
      delete paramsObj.lat;
      delete paramsObj.long;
    }
    if (paramsObj) {
      this.buildHttpParams(params, paramsObj, '');
    }
    return params;
  }

  parseHttpParams(queryParams: any, resultObj: any) {
    Object.keys(queryParams).forEach((x) => {
      const keys = x.split('.');
      const currentKey = keys[0];
      if (keys.length > 1) {
        const nextParseKey = keys.filter((r) => r != currentKey).join('.');
        const nextObj: any = {};
        nextObj[nextParseKey] = queryParams[x];
        resultObj[currentKey] = { ...this.parseHttpParams(nextObj, resultObj[currentKey] || {}) };
      } else {
        resultObj[currentKey] = queryParams[x];
      }
    });

    return resultObj;
  }

  getSupplierTypes() {
    const url = `${environment.backendApi}form-data/facility-form`;
    // const url = 'assets/data/filterForm.json';
    let promise = new Promise((resolve) => {
      this.http
        .get(url)
        .toPromise()
        .then((res: any) => {
          resolve(res?.data);
        });
    });
    return promise;
  }

  getWeddingIdeas() {
    const url = 'assets/data/weddingIdeas.json';
    let promise = new Promise((resolve) => {
      this.http
        .get(url)
        .toPromise()
        .then((res) => {
          resolve(res);
        });
    });
    return promise;
  }

  getSteps() {
    const url = 'assets/data/steps.json';
    let promise = new Promise((resolve) => {
      this.http
        .get(url)
        .toPromise()
        .then((res) => {
          resolve(res);
        });
    });
    return promise;
  }

  getDestinations() {
    const url = 'assets/data/destinations.json';
    let promise = new Promise((resolve) => {
      this.http
        .get(url)
        .toPromise()
        .then((res) => {
          resolve(res);
        });
    });
    return promise;
  }

  getTemplates() {
    const url = 'assets/data/destinations.json';
    let promise = new Promise((resolve) => {
      this.http
        .get(url)
        .toPromise()
        .then((res) => {
          resolve(res);
        });
    });
    return promise;
  }

  getWeddings() {
    const url = 'assets/data/weddings.json';
    let promise = new Promise((resolve) => {
      this.http
        .get(url)
        .toPromise()
        .then((res) => {
          resolve(res);
        });
    });
    return promise;
  }

  // for supplier page
  public navigateToSupplierDetails(supplierId: string, date?: any): void {
    const supplierIdParam = supplierId ? 'id=' + supplierId : '';
    const dateParam = date ? '&date=' + date : '';
    window.open('/supplier?' + supplierIdParam + dateParam, '_blank');
  }

  public getSupplierByID(id: string | null): Observable<any> {
    return this.http.get(`${environment.backendApi}supplier/byID/${id}`);
  }

  public clickSupplierPhoneNumber(id: string): Observable<any> {
    return this.http.get(`${environment.backendApi}supplier/phone-number/${id}`);
  }

  public clickSupplierWebsite(id: string): Observable<any> {
    return this.http.get(`${environment.backendApi}supplier/website/${id}`);
  }

  public addToFavorites(supplierId: string) {
    return this.http.post(`${environment.backendApi}favorite`, { supplierId });
  }

  //for admin mode

  public publishSupplierPage(
    supplierId: string,
    status: string,
    adminToken: string,
    message?: string,
  ) {
    return this.http.patch(
      `${environment.s1Api}admin/updateSupplierListingStatus/${supplierId}`,
      { status, message },
      { headers: { Authorization: `Bearer ${adminToken}` } },
    );
  }

  public getFavorites() {
    return this.http.get<{
      message: string;
      data: Supplier[];
    }>(`${environment.backendApi}favorite`);
  }

  public removeFromFavorites(supplierId: string) {
    return this.http.patch(`${environment.backendApi}favorite`, { supplierId });
  }
}
