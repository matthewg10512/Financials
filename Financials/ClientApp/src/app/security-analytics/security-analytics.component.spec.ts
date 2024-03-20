import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAnalyticsComponent } from './security-analytics.component';

describe('SecurityAnalyticsComponent', () => {
  let component: SecurityAnalyticsComponent;
  let fixture: ComponentFixture<SecurityAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
