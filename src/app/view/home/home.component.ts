import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

// import { domain } from 'process';
import { environment } from 'src/environments/environment';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  weddingIdeas: any[] = [];
  prestigeBallRooms: any[] = [];
  prestigeMusicBands: any[] = [];
  prestigePhotografers: any[] = [];
  prestigeOtherServices: any[] = [];
  steps: any[] = [];
  weddings: any[] = [];
  destinations: any[] = [];
  templates: any[] = [];
  businessWebSite = environment.businessWebSite;
  client360WebSite = environment.client360WebSite;
  show: Boolean = false;

  constructor(
    private ds: DataService,
    private http: HttpClient,
    private dataService: DataService,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.ds.getWeddingIdeas().then((response) => {
      this.weddingIdeas = (response as any).data;
      // console.log(this.weddingIdeas, 'wed ideas')
    });
    this.ds.getPrestigeBallRooms().then((response) => (this.prestigeBallRooms = response as any));
    this.ds.getPrestigeMusicBands().then((response) => (this.prestigeMusicBands = response as any));
    this.ds
      .getPrestigePhotographers()
      .then((response) => (this.prestigePhotografers = response as any));
    this.ds
      .getPrestigeOtherServices()
      .then((response) => (this.prestigeOtherServices = response as any));
    this.ds.getSteps().then((response) => (this.steps = (response as any).data));
    this.ds.getDestinations().then((response) => (this.destinations = (response as any).data));
    this.ds.getWeddings().then((response) => (this.weddings = (response as any).data));
    this.ds.getTemplates().then((response) => (this.templates = (response as any).data));

    // TODO: Implementation?
    // const position = navigator.geolocation.getCurrentPosition((position) => {
    //   console.log(position);
    // });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Marity.ro: Găsește furnizori pentru evenimentul perfect',
    });
    this.meta.updateTag({
      property: 'og:description',
      content: `
        Marity este o platformă completă, destinată conectării eficiente între furnizorii de servicii pentru evenimente și clienții lor,
        optimizând experiența organizării unui eveniment.
      `,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: 'https://storage.googleapis.com/marity-photo-bucket/Marity%20MetaTag%20Image.jpg',
    });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.marity.ro/' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    let tag = this.meta.getTag('property="og:title"');

    let tag2 = this.meta.getTags('property');
    //console.log('metatags', tag2, tag);
  }

  // setCookie() {
  //   this.http.get(`${environment.backendApi}cookie/setRegisterVisitorCookie`).subscribe(response => {
  //     console.log(response); // Print the cookie to the console
  //   });
  // }

  public goToSupplier(supplierDetails: any): void {
    this.dataService.navigateToSupplierDetails(supplierDetails.id);
  }

  public goToLink(link: string): void {
    window.open(link, '_self');
  }

  public showContent(): void {
    this.show = !this.show;
  }
}
