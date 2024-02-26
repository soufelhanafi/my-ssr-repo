import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierMenuMobileComponent } from './supplier-menu-mobile.component';

describe('SupplierMenuMobileComponent', () => {
  let component: SupplierMenuMobileComponent;
  let fixture: ComponentFixture<SupplierMenuMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierMenuMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierMenuMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
