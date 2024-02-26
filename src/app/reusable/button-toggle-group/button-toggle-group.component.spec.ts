import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteesCapacityComponent } from './button-toggle-group.component';

describe('InviteesCapacityComponent', () => {
  let component: InviteesCapacityComponent;
  let fixture: ComponentFixture<InviteesCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteesCapacityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InviteesCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
