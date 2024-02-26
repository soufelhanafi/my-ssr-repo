import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierReviewsComponent } from './supplier-reviews.component';

describe('SupplierReviewsComponent', () => {
  let component: SupplierReviewsComponent;
  let fixture: ComponentFixture<SupplierReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierReviewsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
