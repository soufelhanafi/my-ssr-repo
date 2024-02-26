import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryBannerComponent } from './gallery-banner.component';

describe('GalleryBannerComponent', () => {
  let component: GalleryBannerComponent;
  let fixture: ComponentFixture<GalleryBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryBannerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
