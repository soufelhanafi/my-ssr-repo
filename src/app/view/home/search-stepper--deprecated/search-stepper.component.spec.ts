import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStepperComponent } from './search-stepper.component';

describe('SearchStepperComponent', () => {
  let component: SearchStepperComponent;
  let fixture: ComponentFixture<SearchStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchStepperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
