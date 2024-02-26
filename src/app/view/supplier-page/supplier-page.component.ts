import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {} from 'google-maps';
import { Subscription, finalize } from 'rxjs';

import { SupplierDetails } from 'src/model/supplier';
import { BreakPointService } from 'src/service/break-point.service';
import { DataService } from 'src/service/data.service';
import { SearchService } from 'src/service/search.service';

import { CalendarComponent } from './calendar/calendar.component';
import { OfferRequestComponent } from './offer-request/offer-request.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { RejectPublishDialogBoxComponent } from './reject-publish-dialog-box/reject-publish-dialog-box.component';

@Component({
  selector: 'app-supplier-page',
  templateUrl: './supplier-page.component.html',
  styleUrls: ['./supplier-page.component.scss', './supplier-page-desktop.component.scss'],
})
export class SupplierPageComponent implements OnInit, OnDestroy {
  public mapInstance: google.maps.Map;
  public mapMarker!: google.maps.Marker;
  @ViewChild('googleMapDesktop', { static: false }) gMapDesktop!: ElementRef;
  @ViewChild('googleMapMobile', { static: false }) gMapMobile!: ElementRef;

  public id: any;
  public supplierData: SupplierDetails | undefined;
  public supplierDataToSendOffer: any | null = null;
  public faqPreview: any;
  public facilities: any;
  public showAll = false;
  public imageSource = '';
  public promotionBackgroundImage = '/assets/images/promotion_background_image.png';
  public images: string[];
  public imagesReady: boolean = false;
  public isMobile: boolean;
  public showNumber: boolean = false;
  public mainImageSrc: string;
  public currentImageIndex: number = 0;
  public bookedDate: string;
  public supplierDescription: string;
  private prevScrollPos = window.scrollY;
  //Settings for adminMode

  private subscription: Subscription;
  public adminMode: boolean = false;
  public adminToken: string | null;

  public mapOptions = {
    mapId: 'a3b3a26d13f3f14f',
    center: { lat: 45.9418997, lng: 25.0200795 },
    zoom: 12,
    fullscreenControl: true,
    scrollwheel: false,
    streetViewControl: false,
  };
  // public swiperConfig: NgxSwiperConfig = {
  //   navigationPlacement: 'inside',
  //   pagination: true,
  //   paginationPlacement: 'inside',
  //   navigation: true,
  //   loop: false,

  // };

  public navigator = window.navigator as any;

  constructor(
    private readonly matBottomSheet: MatBottomSheet,
    private readonly activatedRoute: ActivatedRoute,
    private readonly searchService: SearchService,
    private readonly dataService: DataService,
    public readonly breakPointService: BreakPointService,
    private readonly dialog: MatDialog,
    private meta: Meta,
  ) {}

  public ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.adminToken = this.activatedRoute.snapshot.queryParamMap.get('adminToken');
    if (this.adminToken) {
      this.adminMode = true;
      console.log('admin mode activated');
      console.log(this.adminToken, 'adminToken');
    }
    this.bookedDate = this.activatedRoute.snapshot.queryParamMap.get('date') ?? '';
    this.dataService
      .getSupplierByID(this.id)
      .pipe(
        finalize(() => {
          this.imagesReady = true;
        }),
      )
      .subscribe((supplierData: { message: string; data: SupplierDetails }) => {
        this.faqPreview = supplierData.data.FAQPreview;

        let filteredImages = supplierData.data.mediaPhotos.map((item) => item.linkSrc);
        //remove empty string image src from data
        this.images = filteredImages.filter((item) => item !== '');

        this.supplierData = supplierData.data;

        this.supplierDataToSendOffer = { ...supplierData, bookedDate: this.bookedDate };
        setTimeout(() => {
          this.initMap(this.supplierData?.about.location.coordinates);
        }, 0);
        this.mainImageSrc = this.images[0];
        this.supplierDescription = supplierData?.data?.about?.description;
        this.facilities = supplierData.data.FacilityPreview.find(
          (item: any) => item.name === 'Facilitati',
        );
      });

    this.breakPointService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
      if (this.supplierData) {
        setTimeout(() => {
          this.initMap(this.supplierData?.about.location.coordinates);
        }, 0);
      }
    });

    this.searchService.askoffer.subscribe((data) => {
      this.askOffer(data);
    });
    let tag = this.meta.getTag('property="og:title"');

    let tag2 = this.meta.getTags('property');
    console.log('metatags', tag2, tag);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const currentScrollPos = window.scrollY;
    const item = document.getElementById('bottom-supplier-navbar');
    if (!item) {
      return;
    }
    if (this.prevScrollPos > currentScrollPos) {
      item.style.bottom = '0px';
    } else {
      item.style.bottom = '-85px';
    }
    this.prevScrollPos = currentScrollPos;
  }

  initMap(coordinates: number[] | undefined) {
    if (!coordinates) return;
    this.mapOptions.center = { lat: coordinates[1], lng: coordinates[0] };
    const element = this.isMobile
      ? this.gMapMobile?.nativeElement
      : this.gMapDesktop?.nativeElement;
    this.mapInstance = new google.maps.Map(element, this.mapOptions);
    this.setMapMarker(coordinates);
  }

  private setMapMarker(coordinates: number[]) {
    const lng = coordinates[0];
    const lat = coordinates[1];
    const positionMap = new google.maps.LatLng(lat, lng);
    if (this.mapMarker) {
      this.mapMarker.setMap(this.mapInstance);
      this.mapMarker.setPosition(positionMap);
    } else {
      this.mapMarker = new google.maps.Marker({
        position: {
          lat: positionMap?.lat(),
          lng: positionMap?.lng(),
        },
        map: this.mapInstance,
        draggable: false,
        animation: google.maps.Animation.DROP,
        title: this.supplierData?.about.title,
      });
      this.mapMarker.setMap(this.mapInstance);
    }
  }

  public showAllContent(): void {
    this.showAll = !this.showAll;
  }

  public sendMessage(): void {
    this.searchService.openAskOffer();
  }

  public askOffer(date?: string): void {
    let offerRequestDataToSend = { ...this.supplierDataToSendOffer, date: date };
    this.matBottomSheet.open(OfferRequestComponent, { data: offerRequestDataToSend });
  }

  public checkCalendar(): void {
    if (!this.supplierData?.about.displayCalendar) {
      return;
    }
    let calendarDataToSend = {
      bookedDates: this.supplierData.bookedDates,
      title: this.supplierData.about.title,
      isMobile: this.isMobile,
    };
    this.matBottomSheet.open(CalendarComponent, {
      panelClass: 'custom-calendar',
      data: calendarDataToSend,
    });
  }

  public goToOffer(): void {
    console.log('stai asa');
  }

  public showPhoneNumber(): void {
    this.showNumber = !this.showNumber;
    this.dataService.clickSupplierPhoneNumber(this.id).subscribe();
  }

  public scrollToSection(id: string): void {
    let section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  }

  public changeMainImg(imageSrc: string, imageIndex: number): void {
    this.mainImageSrc = imageSrc;
    this.currentImageIndex = imageIndex;
  }

  // share() {
  //   // TODO: Maybe implementation for this?
  //   const dialogRef = this.dialog.open(ShareDialogComponent, {
  //     data: { link: window.location.href },
  //   });
  // }

  public openGallery(): void {
    if (this.images.length) {
      this.matBottomSheet.open(PhotoGalleryComponent, {
        panelClass: 'custom-gallery',
        data: {
          imageIndex: this.currentImageIndex,
          photos: this.images,
          videos: this.supplierData?.videoLink,
        },
      });
    }
  }

  //publish Page When AdminMode is active

  public publishPage(status: string, message?: string): void {
    if (this.adminToken) {
      this.dataService
        .publishSupplierPage(this.id, status, this.adminToken, message)
        .subscribe(() => {
          this.adminMode = false;
        });
    }
  }

  openModalRejectPublish() {
    const rejectDialogBox = this.dialog.open(RejectPublishDialogBoxComponent, {
      width: '500px',
    });
    rejectDialogBox.afterClosed().subscribe((data) => {
      this.publishPage('rejected', data);
    });
  }

  public onBackClick(): void {
    window.history.back();
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
