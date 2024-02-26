import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSingleComponent } from './banner-single.component';

describe('BannerSingleComponent', () => {
  let component: BannerSingleComponent;
  let fixture: ComponentFixture<BannerSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerSingleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
