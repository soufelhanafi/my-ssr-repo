import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonesSliderComponent } from './phones-slider.component';

describe('PhonesSliderComponent', () => {
  let component: PhonesSliderComponent;
  let fixture: ComponentFixture<PhonesSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhonesSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhonesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
