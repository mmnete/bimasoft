import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceEntityFormComponent } from './insurance-entity-form.component';

describe('OrganizationFormComponent', () => {
  let component: InsuranceEntityFormComponent;
  let fixture: ComponentFixture<InsuranceEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceEntityFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InsuranceEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
