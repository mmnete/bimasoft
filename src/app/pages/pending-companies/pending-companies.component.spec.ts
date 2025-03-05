import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCompaniesComponent } from './pending-companies.component';

describe('PendingCompaniesComponent', () => {
  let component: PendingCompaniesComponent;
  let fixture: ComponentFixture<PendingCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingCompaniesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PendingCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
