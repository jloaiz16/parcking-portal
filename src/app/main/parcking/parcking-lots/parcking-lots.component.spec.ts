import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParckingLotsComponent } from './parcking-lots.component';

describe('ParckingLotsComponent', () => {
  let component: ParckingLotsComponent;
  let fixture: ComponentFixture<ParckingLotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParckingLotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParckingLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
