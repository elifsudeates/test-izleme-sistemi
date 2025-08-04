import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAramaComponent } from './search.component';

describe('TestAramaComponent', () => {
  let component: TestAramaComponent;
  let fixture: ComponentFixture<TestAramaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAramaComponent]
    });
    fixture = TestBed.createComponent(TestAramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
