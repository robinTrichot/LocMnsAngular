import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MaterialService } from './material.service';


describe('MaterialService', () => {
  let service: MaterialService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MaterialService]
    });
    service = TestBed.inject(MaterialService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
});

