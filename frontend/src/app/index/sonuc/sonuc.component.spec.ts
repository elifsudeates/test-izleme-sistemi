import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  TestSonucYuklemeComponent } from './sonuc.component';

describe(' TestSonucYuklemeComponent', () => {
  let component:  TestSonucYuklemeComponent;
  let fixture: ComponentFixture< TestSonucYuklemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSonucYuklemeComponent]
    });
    fixture = TestBed.createComponent( TestSonucYuklemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
