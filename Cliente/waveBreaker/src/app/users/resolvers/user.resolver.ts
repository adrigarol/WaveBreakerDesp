import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
export const userResover: ResolveFn<User> = (route, state) => {
  return inject(AuthService)
    .getUserById(route.params['id'])
    .pipe(
      catchError((error) => {
        inject(Router).navigate(['/game/upgrades']);
        return EMPTY;
      })
    );
};
