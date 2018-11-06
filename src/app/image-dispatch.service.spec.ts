import { TestBed } from '@angular/core/testing';

import { ImageDispatchService } from './image-dispatch.service';

describe('ImageDispatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageDispatchService = TestBed.get(ImageDispatchService);
    expect(service).toBeTruthy();
  });
});
