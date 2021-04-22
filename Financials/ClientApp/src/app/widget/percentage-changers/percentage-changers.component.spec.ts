import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageChangersComponent } from './percentage-changers.component';

describe('PercentageChangersComponent', () => {
  let component: PercentageChangersComponent;
  let fixture: ComponentFixture<PercentageChangersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageChangersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageChangersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
