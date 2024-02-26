import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRatingBoxComponent } from './supplier-rating-box.component';

describe('SupplierRatingBoxComponent', () => {
  let component: SupplierRatingBoxComponent;
  let fixture: ComponentFixture<SupplierRatingBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierRatingBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierRatingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
