import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListYourServiceComponent } from './list-your-service.component';

describe('ListYourServiceComponent', () => {
  let component: ListYourServiceComponent;
  let fixture: ComponentFixture<ListYourServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListYourServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListYourServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
