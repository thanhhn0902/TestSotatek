import { TestBed } from '@angular/core/testing';

import { TaskSotatekService } from './tasksotatek.service';

describe('TasksotatekService', () => {
  let service: TaskSotatekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskSotatekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
