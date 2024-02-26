import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAboutComponent } from './supplier-about.component';

describe('SupplierAboutComponent', () => {
  let component: SupplierAboutComponent;
  let fixture: ComponentFixture<SupplierAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierAboutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
