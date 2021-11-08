import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyBreakdownComponent } from './yearly-breakdown.component';

describe('YearlyBreakdownComponent', () => {
  let component: YearlyBreakdownComponent;
  let fixture: ComponentFixture<YearlyBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
