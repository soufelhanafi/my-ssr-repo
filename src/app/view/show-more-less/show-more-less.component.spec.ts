import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMoreLessComponent } from './show-more-less.component';

describe('ShowMoreLessComponent', () => {
  let component: ShowMoreLessComponent;
  let fixture: ComponentFixture<ShowMoreLessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowMoreLessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowMoreLessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
