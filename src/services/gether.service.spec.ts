import { TestBed } from '@angular/core/testing';

import { GetherService } from './gether.service';

describe('GetherService', () => {
  let service: GetherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
