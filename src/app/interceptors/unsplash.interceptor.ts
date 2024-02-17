import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

const client_id = 'fkz4FVjrALPXX7PUsbRmj30krNbyve9mTGEFh_-7iR0';

export const test: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const modifiedReq = req.clone({
    setParams: {
      client_id,
    },
  });

  return next(modifiedReq);
};
