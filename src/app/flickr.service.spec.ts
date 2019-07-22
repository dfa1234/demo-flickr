import { TestBed } from '@angular/core/testing';

import { FlickrService } from './flickr.service';
import {HttpClientModule} from "@angular/common/http";

describe('FlickrService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientModule]
  }));

  it('should be created', () => {
    const service: FlickrService = TestBed.get(FlickrService);
    expect(service).toBeTruthy();
  });

  it(`get non-empty pictures list from query 'test'`, (done) => {
    const service: FlickrService = TestBed.get(FlickrService);
    service.getPictures$('test').subscribe(
        res=> {
          expect(res && res.length && res[0].url).toBeTruthy();
          done();
        }
    )
  });
});
