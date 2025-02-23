import { TestBed } from '@angular/core/testing';

import { OrgScraperService } from './org-scraper.service';

describe('OrgScraperService', () => {
  let service: OrgScraperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgScraperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
