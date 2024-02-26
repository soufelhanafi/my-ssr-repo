import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, finalize, takeUntil } from 'rxjs';

import { APP_SETTINGS } from '@core/constants';
import { SupplierService } from '@features/components/supplier/services/supplier.service';
import { SupplierTabsEnum, SupplierTabsLabelEnum } from '@features/constants';
import { SupplierTabsModel } from '@features/models';
import { SupplierRequestOfferService } from '@features/services';
import { MediaModel } from '@shared/models';
import { GalleryService, ViewportService } from '@shared/services';
import { SupplierDetails } from 'src/model/supplier';
import { DataService } from 'src/service/data.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss', './supplier-tabs.component.scss'],
  providers: [SupplierRequestOfferService],
})
export class SupplierComponent implements OnInit, OnDestroy {
  activeFigure: MediaModel | null = null;
  componentMobileActivePopupName: string = APP_SETTINGS.EMPTY_LINE;
  supplierTabs: SupplierTabsModel[] = [];
  supplierData: SupplierDetails | undefined;
  supplierGallery: MediaModel[] = [];
  imagesReady: boolean = false;
  isMobile$: Observable<boolean>;
  isMobile: boolean = false;

  private onDestroy$ = new Subject<boolean>();

  readonly SupplierTabsEnum = SupplierTabsEnum;
  readonly SupplierTabsLabelEnum = SupplierTabsLabelEnum;

  constructor(
    private viewportService: ViewportService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private galleryService: GalleryService,
    private supplierService: SupplierService,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.setSupplierTabs();
    this.getAboutSupplierInformation();
    this.listenToActiveFigure();
    this.listenToViewPort();
    this.listenToComponentMobileActivePopupName();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  private setSupplierTabs(): void {
    this.supplierTabs = Object.keys(SupplierTabsEnum).map((tab) => ({
      id: tab,
      label: SupplierTabsLabelEnum[tab as keyof typeof SupplierTabsEnum],
    }));
  }

  private getAboutSupplierInformation(): void {
    this.dataService
      .getSupplierByID(this.route.snapshot.queryParamMap.get('id'))
      .pipe(
        takeUntil(this.onDestroy$),
        finalize(() => {
          this.imagesReady = true;
        }),
      )
      .subscribe((supplierData: { message: string; data: SupplierDetails }) => {
        this.supplierData = supplierData.data;
        this.supplierGallery = this.galleryService.mapSupplierGallery(supplierData.data);
        this.meta.updateTag({
          property: 'og:title',
          content: `${this.supplierData.about.title} - ${this.supplierData.about.city} @Marity.ro`,
        });
        this.meta.updateTag({
          property: 'og:description',
          content: `${this.supplierData.about.description}`,
        });
        this.meta.updateTag({
          property: 'og:image',
          content: `${this.supplierData.mediaPhotos[0].linkSrc}`,
        });
        this.meta.updateTag({
          property: 'og:url',
          // eslint-disable-next-line no-underscore-dangle
          content: `https://marity.ro/supplier?id=${this.supplierData._id}`,
        });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
      });
  }

  private listenToActiveFigure(): void {
    this.galleryService.activeFigure$.subscribe(
      (activeFigure) => (this.activeFigure = activeFigure),
    );
  }

  private listenToViewPort(): void {
    this.isMobile$ = this.viewportService.isMobile$.pipe(takeUntil(this.onDestroy$));
    this.viewportService.isMobile$.pipe(takeUntil(this.onDestroy$)).subscribe((isMobile) => {
      this.supplierService.componentMobileActivePopupName.next(APP_SETTINGS.EMPTY_LINE);
      this.galleryService.activeFigure$.next(null);
      this.isMobile = isMobile;
    });
  }

  private listenToComponentMobileActivePopupName(): void {
    this.supplierService.componentMobileActivePopupName.subscribe((status) => {
      this.componentMobileActivePopupName = status;
    });
  }
}
