import type { HttpInterceptorFn } from '@angular/common/http';
import { from, switchMap, catchError } from 'rxjs';
import { getFirebaseUser } from '../../features/auth/utils/auth-token.util';

export const firebaseAuthInterceptor: HttpInterceptorFn = (req, next) => {
  return from(getFirebaseUser()).pipe(
    switchMap((user) => {

      if (!user) {
        return next(req); // Usuario no autenticado aún
      }

      return from(user.getIdToken()).pipe(
        switchMap((token) => {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next(authReq);
        })
      );
    }),
    catchError((error) => {
      console.error(error);
      return next(req);
    })
  );
};
