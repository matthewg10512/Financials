import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningWidgetComponent } from './earning-widget.component';

describe('EarningComponent', () => {
  let component: EarningWidgetComponent;
  let fixture: ComponentFixture<EarningWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EarningWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
