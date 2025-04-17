import { TestBed } from '@angular/core/testing';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';

import { metaDataInterceptor } from './meta-data.interceptor';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { LocalStorageService } from '@app/shared/services/local-storage.service';

describe('metaDataInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => metaDataInterceptor(req, next));

  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', ['get']);

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
    const mockNext: HttpHandlerFn = () => of({} as HttpResponse<unknown>);

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
    const mockNext: HttpHandlerFn = () => of({} as HttpEvent<unknown>);

    const result = interceptor(mockRequest, mockNext);

    expect(localStorageService.get).toHaveBeenCalledWith('token');
    result.subscribe(() => {
      expect(mockRequest.headers.get('Authorization')).toBeNull();
    });
  });
});
