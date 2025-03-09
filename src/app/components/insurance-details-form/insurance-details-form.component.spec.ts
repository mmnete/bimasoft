import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceDetailsFormComponent } from './insurance-details-form.component';

describe('InsuranceDetailsFormComponent', () => {
  let component: InsuranceDetailsFormComponent;
  let fixture: ComponentFixture<InsuranceDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceDetailsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
