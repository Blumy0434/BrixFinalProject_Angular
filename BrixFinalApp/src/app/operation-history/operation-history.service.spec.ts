import { TestBed } from '@angular/core/testing';

import { OperationHistoryService } from './operation-history.service';

describe('OperationHistoryService', () => {
  let service: OperationHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
