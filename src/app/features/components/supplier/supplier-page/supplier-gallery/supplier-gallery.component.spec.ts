import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierGalleryComponent } from './supplier-gallery.component';

describe('SupplierGalleryComponent', () => {
  let component: SupplierGalleryComponent;
  let fixture: ComponentFixture<SupplierGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierGalleryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
