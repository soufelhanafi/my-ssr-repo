import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierEventComponent } from './supplier-event.component';

describe('SupplierEventComponent', () => {
  let component: SupplierEventComponent;
  let fixture: ComponentFixture<SupplierEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierEventComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
