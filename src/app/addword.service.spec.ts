import { TestBed } from '@angular/core/testing';

import { AddwordService } from './addword.service';

describe('AddwordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddwordService = TestBed.get(AddwordService);
    expect(service).toBeTruthy();
  });
});
