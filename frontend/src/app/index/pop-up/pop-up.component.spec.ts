import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPopupComponent } from './pop-up.component';

describe('StatusPopupComponent', () => {
  let component: StatusPopupComponent;
  let fixture: ComponentFixture<StatusPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusPopupComponent]
    });
    fixture = TestBed.createComponent(StatusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
