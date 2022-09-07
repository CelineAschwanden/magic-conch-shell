import { TestBed } from '@angular/core/testing';

import { FunctionsService } from './http-service.service';

describe('HttpServiceService', () => {
  let service: FunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
