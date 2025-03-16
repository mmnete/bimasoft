import { TestBed } from '@angular/core/testing';

import { InsuranceBrokerService } from './insurance-broker.service';

describe('InsuranceBrokerService', () => {
  let service: InsuranceBrokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceBrokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
