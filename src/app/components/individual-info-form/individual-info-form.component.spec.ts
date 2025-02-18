import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualInfoFormComponent } from './individual-info-form.component';

describe('IndividualInfoFormComponent', () => {
  let component: IndividualInfoFormComponent;
  let fixture: ComponentFixture<IndividualInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualInfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
