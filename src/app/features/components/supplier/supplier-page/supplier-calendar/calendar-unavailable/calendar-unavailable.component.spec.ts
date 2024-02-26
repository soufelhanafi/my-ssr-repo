import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarUnavailableComponent } from './calendar-unavailable.component';

describe('CalendarUnavailableComponent', () => {
  let component: CalendarUnavailableComponent;
  let fixture: ComponentFixture<CalendarUnavailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarUnavailableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
