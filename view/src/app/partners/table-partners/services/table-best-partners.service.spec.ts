import { TestBed } from '@angular/core/testing';

import { TableBestPartnersService } from './table-best-partners.service';

describe('TableBestPartnersService', () => {
  let service: TableBestPartnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableBestPartnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
