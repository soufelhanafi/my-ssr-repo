import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCalendarComponent } from './supplier-calendar.component';

describe('SupplierCalendarComponent', () => {
  let component: SupplierCalendarComponent;
  let fixture: ComponentFixture<SupplierCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierCalendarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
