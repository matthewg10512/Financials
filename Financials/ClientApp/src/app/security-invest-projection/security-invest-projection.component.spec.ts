import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityInvestProjectionComponent } from './security-invest-projection.component';

describe('SecurityInvestProjectionComponent', () => {
  let component: SecurityInvestProjectionComponent;
  let fixture: ComponentFixture<SecurityInvestProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityInvestProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityInvestProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
