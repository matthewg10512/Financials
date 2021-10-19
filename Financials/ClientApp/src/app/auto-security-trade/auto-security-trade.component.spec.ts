import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSecurityTradeComponent } from './auto-security-trade.component';

describe('AutoSecurityTradeComponent', () => {
  let component: AutoSecurityTradeComponent;
  let fixture: ComponentFixture<AutoSecurityTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoSecurityTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSecurityTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
