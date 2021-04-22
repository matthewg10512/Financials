import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendWidgetComponent } from './dividend-widget.component';

describe('DividendWidgetComponent', () => {
  let component: DividendWidgetComponent;
  let fixture: ComponentFixture<DividendWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividendWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
