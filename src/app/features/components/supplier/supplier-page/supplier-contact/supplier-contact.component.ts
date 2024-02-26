import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import { APP_SETTINGS } from '@core/constants';
import { SupplierDetails } from 'src/model/supplier';

@Component({
  selector: 'app-supplier-contact',
  templateUrl: './supplier-contact.component.html',
  styleUrls: ['./supplier-contact.component.scss'],
})
export class SupplierContactComponent implements OnChanges {
  mapInstance: google.maps.Map;
  mapMarker!: google.maps.Marker;
  contacts: any = [];
  socialLinks: { icon: string; name: string; link: string }[] = [];
  mapOptions = APP_SETTINGS.DEFAULT_MAP_OPTIONS;
  readonly APP_SETTINGS = APP_SETTINGS;

  @Input() supplierData: SupplierDetails | undefined;
  @Input() isMobile: boolean;
  @ViewChild('googleMapDesktop', { static: false }) gMap!: ElementRef;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['supplierData'].currentValue?.about) {
      const about = changes['supplierData'].currentValue?.about;
      if (about.contact) {
        this.contacts.push(about.contact);
      }
      if (about.contactList) {
        this.contacts.push(...about.contactList);
      }
      if (about.facebookLink) {
        this.socialLinks.push({
          icon: 'facebook_icon.svg',
          name: 'Facebook',
          link: about.facebookLink,
        });
      }
      if (about.instagramLink) {
        this.socialLinks.push({
          icon: 'instagram_icon.svg',
          name: 'Instagram',
          link: about.instagramLink,
        });
      }
      if (about.pinteresLink) {
        this.socialLinks.push({
          icon: 'pinterest_icon.svg',
          name: 'Pinterest',
          link: about.pinteresLink,
        });
      }
      if (about.websiteLink) {
        this.socialLinks.push({
          icon: 'website_icon.svg',
          name: 'WebSite',
          link: about.websiteLink,
        });
      }

      setTimeout(() => {
        this.initMap(this.supplierData?.about.location.coordinates);
      }, 0);
    }
  }

  initMap(coordinates: number[] | undefined) {
    if (!coordinates) return;
    this.mapOptions.center = { lat: coordinates[1], lng: coordinates[0] };
    this.mapInstance = new google.maps.Map(this.gMap.nativeElement, this.mapOptions);
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
}
