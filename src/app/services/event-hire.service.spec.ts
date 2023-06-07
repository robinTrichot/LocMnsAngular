import { TestBed } from '@angular/core/testing';

import { EventHireService } from './event-hire.service';

describe('EventHireService', () => {
  let service: EventHireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventHireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
