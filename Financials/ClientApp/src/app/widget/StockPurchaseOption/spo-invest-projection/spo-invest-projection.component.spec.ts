import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoInvestProjectionComponent } from './spo-invest-projection.component';

describe('SpoInvestProjectionComponent', () => {
  let component: SpoInvestProjectionComponent;
  let fixture: ComponentFixture<SpoInvestProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpoInvestProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoInvestProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
