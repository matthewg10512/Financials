import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityProjectionComponent } from './security-projection.component';

describe('SecurityProjectionComponent', () => {
  let component: SecurityProjectionComponent;
  let fixture: ComponentFixture<SecurityProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
