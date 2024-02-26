import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleUserReviewCardComponent } from './google-user-review-card.component';

describe('GoogleUserReviewCardComponent', () => {
  let component: GoogleUserReviewCardComponent;
  let fixture: ComponentFixture<GoogleUserReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleUserReviewCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(GoogleUserReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
