import { TestBed } from '@angular/core/testing';

import { TransferService } from './transfer-service.service';

describe('TransferServiceService', () => {
  let service: TransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
