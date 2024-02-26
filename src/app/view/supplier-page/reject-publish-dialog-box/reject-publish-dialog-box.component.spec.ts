import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectPublishDialogBoxComponent } from './reject-publish-dialog-box.component';

describe('RejectPublishDialogBoxComponent', () => {
  let component: RejectPublishDialogBoxComponent;
  let fixture: ComponentFixture<RejectPublishDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejectPublishDialogBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RejectPublishDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
