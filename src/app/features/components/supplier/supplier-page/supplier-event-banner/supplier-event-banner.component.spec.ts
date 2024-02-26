import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierEventBannerComponent } from './supplier-event-banner.component';

describe('SupplierEventBannerComponent', () => {
  let component: SupplierEventBannerComponent;
  let fixture: ComponentFixture<SupplierEventBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierEventBannerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierEventBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
