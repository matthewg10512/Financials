import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoSecPurStatComponent } from './spo-sec-pur-stat.component';

describe('SpoSecPurStatComponent', () => {
  let component: SpoSecPurStatComponent;
  let fixture: ComponentFixture<SpoSecPurStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpoSecPurStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoSecPurStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
