import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReviewBoxComponent } from './new-review-box.component';

describe('NewReviewBoxComponent', () => {
  let component: NewReviewBoxComponent;
  let fixture: ComponentFixture<NewReviewBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewReviewBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewReviewBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
