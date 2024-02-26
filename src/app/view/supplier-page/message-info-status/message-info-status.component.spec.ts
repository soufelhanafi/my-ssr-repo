import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInfoStatusComponent } from './message-info-status.component';

describe('MessageInfoStatusComponent', () => {
  let component: MessageInfoStatusComponent;
  let fixture: ComponentFixture<MessageInfoStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageInfoStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageInfoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
