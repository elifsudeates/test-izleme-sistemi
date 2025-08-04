import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaliteRaporuComponent } from './kalite-rapor.component';

describe('KaliteRaporComponent', () => {
  let component: KaliteRaporuComponent;
  let fixture: ComponentFixture<KaliteRaporuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KaliteRaporuComponent]
    });
    fixture = TestBed.createComponent(KaliteRaporuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
