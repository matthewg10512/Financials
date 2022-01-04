import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoPeakRangeComponent } from './spo-peak-range.component';

describe('SpoPeakRangeComponent', () => {
  let component: SpoPeakRangeComponent;
  let fixture: ComponentFixture<SpoPeakRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpoPeakRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoPeakRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
