import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, platformBrowser } from "@angular/platform-browser";
import { NavigationStart, Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';

import { APP_SETTINGS } from '@core/constants';
import { SupplierService } from '@features/components/supplier/services/supplier.service';
import { environment } from 'src/environments/environment';
import { isMobile } from 'src/service/isMobile';

import { GalleryService, MediaModel } from './shared';
import { CookieModalComponent } from './view/cookie-modal/cookie-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  activeImage: MediaModel | null = null;
  componentMobileActivePopupName: string = APP_SETTINGS.EMPTY_LINE;
  title = 'maritymain';
  isMobile = isMobile();
  routerSubscription: Subscription;

  private onDestroy$ = new Subject<boolean>();

  constructor(
    public readonly router: Router,
    private readonly http: HttpClient,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private galleryService: GalleryService,
    private supplierService: SupplierService,
    public dialog: MatDialog,
    public location: Location,
    @Inject(PLATFORM_ID) private readonly platformId: any,
  ) {}

  public async ngOnInit() {
    this.checkCookie();
    this.routerSubscription = this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationStart && platformBrowser(this.platformId)) {
        window.scrollTo(<any>{ top: 0, behavior: 'instant' });
      }
    });

    this.initSvgIcons();
    this.listenToComponentMobileActivePopupName();
    this.listenToGalleryService();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  setEssentialCookie() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.backendApi}set-cookie`, { withCredentials: true }).subscribe(
        (cookieData: any) => {
          // window.location.reload()
          console.log('set essential cki', cookieData);
        },
        (error: any) => {
          // Handle the error
          console.error(error);
          // Throw an error or call a function to handle the error
          reject(new Error('Error occurred while setting the cookie'));
        },
      );
    });
  }

  setAllCookie() {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.backendApi}set-cookie`, { withCredentials: true }).subscribe(
        () => {
          this.registerVisitorCookie();
        },
        (error: any) => {
          // Handle the error
          console.error(error);
          // Throw an error or call a function to handle the error
          reject(new Error('Error occurred while setting the cookie'));
        },
      );
    });
  }

  checkCookie() {
    this.http.get(`${environment.backendApi}check-cookie`).subscribe((result: any) => {
      if (!result.data.M_SESSION && !result.data.M_REG_GUEST) {
        const cookieModal = this.dialog.open(CookieModalComponent, {
          disableClose: true,
          width: '70%',
          position: { bottom: '40px' },
        });
        cookieModal.afterClosed().subscribe((closed) => {
          if (closed && closed.essentialCookiesAccepted) {
            this.setEssentialCookie();
          }
          if (closed && closed.allCookiesAccepted) {
            this.setAllCookie();
          }
        });
      } else if (!result.data.M_SESSION && result.data.M_REG_GUEST) {
        this.setEssentialCookie();
      }
    });
  }

  registerVisitorCookie() {
    this.http
      .get(`${environment.backendApi}cookie/set-reg-visitor-cookie`)
      .subscribe((response) => {
        console.log(response); // Print the cookie to the console
      });
  }

  private initSvgIcons(): void {
    const svgIcons: string[] = [
      'above_arrow',
      'accommodation',
      'air_conditioning',
      'altele',
      'aranjamente_artificiale',
      'aranjamente_naturale',
      'arrow_left',
      'arrow_right',
      'below_arrow',
      'black-dot-icon',
      'botez',
      'calendar',
      'calendar-black',
      'clock-icon',
      'cloud_upload',
      'cocardele',
      'consulatanta',
      'corporate',
      'cununie',
      'decoratiuni_masini',
      'decoruri',
      'dejay',
      'dot-icon',
      'down-arrow',
      'drinks-icon',
      'efecte-icon',
      'email',
      'entertainer-icon',
      'event-icon-2',
      'facebook',
      'favourit-icon',
      'favorit-white-icon',
      'filter-icon',
      'formatii-icon',
      'fotovide-icon',
      'general',
      'instagram',
      'instalare_aranjamente',
      'kitchen',
      'left-arrow',
      'light_bulb',
      'livrare',
      'locatii-icon',
      'masa_festiva',
      'nunta',
      'parking',
      'people',
      'pinterest_icon',
      'phone',
      'phone_success',
      'photo_edit',
      'photobooth',
      'pool',
      'print',
      'review-start-icon',
      'right-arrow',
      'scene',
      'search-icon',
      'smoking_area',
      'stars',
      'submit',
      'success',
      'supplier-icon',
      'terrace',
      'test-supplier-image',
      'transport-icon',
      'user',
      'video_crane',
      'wifi',
      'youtube',
    ];

    for (let icon of svgIcons) {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/' + icon + '.svg'),
      );
    }
  }

  private listenToGalleryService(): void {
    this.galleryService.activeFigure$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((activeImage) => (this.activeImage = activeImage));
  }

  private listenToComponentMobileActivePopupName(): void {
    this.supplierService.componentMobileActivePopupName.subscribe(
      (status) => (this.componentMobileActivePopupName = status),
    );
  }
}

// DE FACUT:
// modificat primul modal de cookie cu : Accepta tot - Prefeinte. Dupa click preferinte ->
// Un alt modal cu preferinte

// firtst access -> se face setRegisterVisitorCookie
// -mSession cookie -> inregistreaza session. valabil 24h ,

// - se verifica daca este mRegGuest ->este vizitator inregistrat
// 		daca este TRUE, nu mai afisam modalul
// 		ddaca este FALSE , se afiseaza

// -

// https://s2.marity.ro/api/check-cookie
// dupa checkCookie, verificam daca este :

// 	dupa click pe ok ,  facem call /api/set-cookie

// in functie de raspuns, DACA  a acceptat tot, facem call pe api/cookie/registered-visitor-cookie,
// abia atunci aducem data sa o scriem in local-storage !
