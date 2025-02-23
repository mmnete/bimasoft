import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInsuranceFlowComponent } from './car-insurance-flow.component';

describe('CarInsuranceFlowComponent', () => {
  let component: CarInsuranceFlowComponent;
  let fixture: ComponentFixture<CarInsuranceFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarInsuranceFlowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarInsuranceFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
