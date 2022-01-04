import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPurchaseOptionComponent } from './stock-purchase-option.component';

describe('StockPurchaseOptionComponent', () => {
  let component: StockPurchaseOptionComponent;
  let fixture: ComponentFixture<StockPurchaseOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPurchaseOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPurchaseOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
