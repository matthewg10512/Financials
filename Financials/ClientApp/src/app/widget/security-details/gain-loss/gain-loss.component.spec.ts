import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GainLossComponent } from './gain-loss.component';

describe('GainLossComponent', () => {
  let component: GainLossComponent;
  let fixture: ComponentFixture<GainLossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GainLossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GainLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
