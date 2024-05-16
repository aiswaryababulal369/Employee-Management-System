import { TestBed } from '@angular/core/testing';

import { AuthicationServiceService } from './authication-service.service';

describe('AuthicationServiceService', () => {
  let service: AuthicationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthicationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
