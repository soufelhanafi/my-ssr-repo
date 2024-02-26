import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRequestOfferComponent } from './supplier-request-offer.component';

describe('SupplierRequestOfferComponent', () => {
  let component: SupplierRequestOfferComponent;
  let fixture: ComponentFixture<SupplierRequestOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierRequestOfferComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRequestOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
