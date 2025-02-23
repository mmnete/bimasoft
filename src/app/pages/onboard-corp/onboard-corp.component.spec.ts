import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardCorpComponent } from './onboard-corp.component';

describe('OnboardCorpComponent', () => {
  let component: OnboardCorpComponent;
  let fixture: ComponentFixture<OnboardCorpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardCorpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardCorpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
