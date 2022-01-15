import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoSecDetailComponent } from './spo-sec-detail.component';

describe('SpoSecDetailComponent', () => {
  let component: SpoSecDetailComponent;
  let fixture: ComponentFixture<SpoSecDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpoSecDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoSecDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
