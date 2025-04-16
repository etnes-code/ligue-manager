import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageKeys } from '@app/shared/constants/local-storage-keys.constant';
import { LocalStorageService } from '@app/shared/services/local-storage.service';

export const metaDataInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(LocalStorageService);
  const token = localStorage.get(LocalStorageKeys.TOKEN);
  req = req.clone({
    url: req.url,
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(req);
};
