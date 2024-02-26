import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierComponentHeaderComponent } from './supplier-component-header.component';

describe('SupplierComponentHeaderComponent', () => {
  let component: SupplierComponentHeaderComponent;
  let fixture: ComponentFixture<SupplierComponentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierComponentHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupplierComponentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
