import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParckingComponent } from './parcking.component';

describe('ParckingComponent', () => {
  let component: ParckingComponent;
  let fixture: ComponentFixture<ParckingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParckingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
