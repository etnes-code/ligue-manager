import { TestBed } from '@angular/core/testing';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';

import { metaDataInterceptor } from './meta-data.interceptor';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { LocalStorageService } from '@app/shared/services/local-storage.service';

describe('metaDataInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => metaDataInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
describe('metaDataInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => metaDataInterceptor(req, next));

  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  //let mockNext: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', ['get']);
   // mockNext = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: localStorageService },
      ],
    });
  });

  it('should add Authorization header with token', () => {
    const token = 'test-token';
    localStorageService.get.and.returnValue(token);

    const mockRequest = new HttpRequest('GET', '/test');
    const mockNext: HttpHandlerFn = req => of({} as HttpResponse<any>);

    const result = interceptor(mockRequest, mockNext);

    expect(localStorageService.get).toHaveBeenCalledWith('token');
    result.subscribe(res => {
      if (res instanceof HttpResponse) {
        expect(res.headers.get('Authorization')).toBe(`Bearer ${token}`);
      }
    });
  });

  it('should not modify the request if no token is present', () => {
    localStorageService.get.and.returnValue(null);

    const mockRequest = new HttpRequest('GET', '/test');
    const mockNext: HttpHandlerFn = req => of({} as HttpEvent<any>);

    const result = interceptor(mockRequest, mockNext);

    expect(localStorageService.get).toHaveBeenCalledWith('token');
    result.subscribe(res => {
      expect(mockRequest.headers.get('Authorization')).toBeNull();
    });
  });
});
