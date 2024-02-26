import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswearComponent } from './question-answear.component';

describe('QuestionAnswearComponent', () => {
  let component: QuestionAnswearComponent;
  let fixture: ComponentFixture<QuestionAnswearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionAnswearComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionAnswearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
