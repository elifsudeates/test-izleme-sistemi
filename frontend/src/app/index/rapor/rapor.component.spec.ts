import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSonucComponent } from './rapor.component';

describe('TestSonucComponent', () => {
  let component: TestSonucComponent;
  let fixture: ComponentFixture<TestSonucComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestSonucComponent]
    });
    fixture = TestBed.createComponent(TestSonucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
