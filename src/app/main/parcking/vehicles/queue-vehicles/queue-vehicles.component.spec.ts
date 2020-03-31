import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueVehiclesComponent } from './queue-vehicles.component';

describe('QueueVehiclesComponent', () => {
  let component: QueueVehiclesComponent;
  let fixture: ComponentFixture<QueueVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
