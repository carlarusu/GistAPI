import { TestBed } from '@angular/core/testing';

import { GistApiService } from './gist-api.service';

describe('GistApiService', () => {
  let service: GistApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GistApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
