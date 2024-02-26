import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";

import { PhoneFrameContent } from '../phone-frame.interface';
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-phones-slider',
  templateUrl: './phones-slider.component.html',
  styleUrls: ['./phones-slider.component.scss'],
})
export class PhonesSliderComponent implements OnInit {
  public phoneFrameContentArray: PhoneFrameContent[] = [
    {
      title: 'Listează-ți serviciul',
      description: `
        Cu Marity Business, poți lista și gestiona ușor serviciile tale oferite,
        astfel încât să fii mereu organizat și pregătit pentru clienții noi.
      `,
      pictureSrc: '/assets/images/phone_frames/phone_frame_1.svg',
      className: 'half-width',
    },
    {
      title: 'Creează-ți propria ta pagină de prezentare',
      description:
        'Încarcă fotografii, alege facilități, scrie o descriere și răspunde la întrebări frecvente cu Marity Business',
      pictureSrc: '/assets/images/phone_frames/phone_frame_2.svg',
      className: 'half-width',
    },
    {
      title:
        'Creează promoții personalizate și atrage noi clienți, mărește-ți aria de activitate și dezvoltă-ți afacerea cu Marity Business',
      description: `
        Intuitiv și ușor de utilizat, poți să-ți promovezi serviciile într-un mod personalizat
        și să ajungi la publicul potrivit în mod eficient.
        Astfel, poți să-ți dezvolți afacerea și să crești veniturile într-un mod sustenabil și în creștere.
      `,
      pictureSrc: '/assets/images/phone_frames/phone_frame_3.svg',
      className: 'full-width',
      buttonText: 'Începe acum',
    },
    {
      title: 'Gestionare clienți',
      description:
        'Gestionează-ți clienții și comunică cu ei în timp real prin intermediul funcției noastre de Chat.',
      pictureSrc: '/assets/images/phone_frames/phone_frame_4.svg',
      className: 'half-width',
    },
    {
      title: 'Smart calendar',
      description:
        'Planifica și organizează cu ușurință evenimentele tale,  întâlniri cu clienții, conferințe și petreceri.',
      pictureSrc: '/assets/images/phone_frames/phone_frame_5.svg',
      className: 'half-width',
    },
    {
      title:
        'Creează promoții personalizate și atrage noi clienți, mărește-ți aria de activitate și dezvoltă-ți afacerea cu Marity Business',
      description: `
        Intuitiv și ușor de utilizat, poți să-ți promovezi serviciile într-un mod personalizat și să ajungi
        la publicul potrivit în mod eficient.Astfel, poți să-ți dezvolți afacerea
        și să crești veniturile într-un mod sustenabil și în creștere.
      `,
      pictureSrc: '/assets/images/phone_frames/phone_frame_3.svg',
      className: 'full-width',
      buttonText: 'Începe acum',
    },
  ];

  offsetX = 0;
  imageWidth = 300;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.offsetX -= 1;
        if (this.offsetX <= -this.phoneFrameContentArray.length * this.imageWidth) {
          this.offsetX = 0;
        }
      }, 20);
    }
  }
}
