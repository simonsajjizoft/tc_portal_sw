import { TestBed } from '@angular/core/testing';

import { ToStrService } from './to-str.service';

describe('ToStrService', () => {
  let service: ToStrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToStrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
