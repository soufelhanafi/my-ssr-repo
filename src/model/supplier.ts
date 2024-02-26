import { SupplierGoogleReviewsModel } from '@features/models';

export interface Supplier {
  name: string;
  city?: string;
  county?: string;
  imgPath: string;
  capacityMax: string;
  capacityMin: string;
  rating?: number;
  available?: boolean;
  freeDates?: string[];
  proposedDates?: string[];
  isFavorite?: boolean;

  link: string;
  type: string; // make enum
}

export interface SupplierType {
  name: string;
  img: string;
  isActive: boolean;
}

export interface SupplierDetails {
  _id?: string;
  userID?: string;
  businessServiceType?: string;
  about: AboutWorkCenter;
  color?: string;
  companyDetails?: CompanyDetails;
  mediaPhotos: MediaItem[];
  bookedDates: [];
  videoLink?: MediaItem[];
  mediaTour?: MediaItem[];
  catalogues?: Catalogue[];
  promotions?: IPromotion[];
  templates?: { contract: string; offer: string };
  googleRating: number;
  googleReviews: SupplierGoogleReviewsModel[];
  Facility: {
    TipulLocalului: {};
    CapacitateRange: {
      minCap: number;
      maxCap: number;
    };
    Facilitati: {};
    ServiciiComplementare: {};
  };
  FAQPreview: any;
  FacilityPreview: any;
  contractTerms?: string[];
  eventBookDate?: string[];
  activeSubscription?: { fromDate: string; thruDate: string; countyListed: string[] };
  onlineStatus?: boolean;
  [key: string]: any;
  createdAt?: Date;
}

export interface MediaItem {
  _id: string;
  name: string;
  linkSrc: string;
}

export interface CompanyDetails {
  logoLink?: string;
  name?: string;
  cui?: string;
  regNo?: string;
  county?: string;
  city?: string;
  address?: string;
  bankName?: string;
  iban?: string;
}

export interface AboutWorkCenter {
  title: string;
  description: string;
  displayCalendar: boolean;
  facebookLink?: string;
  instagramLink?: string;
  pinteresLink?: string;
  websiteLink?: string;
  county: string;
  city: string;
  address: string;
  addressObservation?: string;
  rating?: number;
  // to delete
  coordinates?: { x: string; y: string };
  location: { type: string; coordinates: number[] };
  contact: AboutContact;
  contactList: AboutContact[];
  postalCode?: string;
  eventTypes?: string[];
}

export interface AboutContact {
  name?: string;
  email?: string;
  phone?: string;
  webSiteLink?: string;
}

export interface IPromotion {
  id?: string;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  discount?: number;
  photoUrl?: string;
}

export class Promotion implements IPromotion {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  discount?: number;
  photoUrl?: string;
  constructor(startDate: string, endDate: string) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export interface Catalogue {
  _id?: string;
  title?: string;
  description?: string;
  linkPhotos?: MediaItem[];
}
