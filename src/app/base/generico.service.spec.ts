import { TestBed } from '@angular/core/testing';

import { Generico } from './generico.service';

describe('Generico', () => {
  let service: Generico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Generico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
