import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { MediaModel } from '@shared/models';
import { shuffleArrayElements } from '@utils/array-utils';
import { SupplierDetails } from 'src/model/supplier';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  activeFigure$: Subject<MediaModel | null> = new Subject();

  constructor(private domSanitizer: DomSanitizer) {}

  mapSupplierGallery(supplierData: SupplierDetails): MediaModel[] {
    const { mediaPhotos, videoLink } = supplierData;
    const allMedia = mediaPhotos
      .map((figure) => ({
        ...figure,
        linkSrc: <string>this.domSanitizer.bypassSecurityTrustResourceUrl(figure.linkSrc),
        isVideo: false,
      }))
      .concat(
        (videoLink || []).map((video) => ({
          ...video,
          linkSrc: <string>this.domSanitizer.bypassSecurityTrustResourceUrl(video.linkSrc),
          isVideo: true,
        })),
      );

    return shuffleArrayElements(allMedia) || [];
  }
}
