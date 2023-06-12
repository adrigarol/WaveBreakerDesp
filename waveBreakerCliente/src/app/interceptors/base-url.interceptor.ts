import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const reqClone = req.clone({
    url: `http://vps-7911aa9f.vps.ovh.net:3000/${req.url}`,
  });
  return next(reqClone);
};
