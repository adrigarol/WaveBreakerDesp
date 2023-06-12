import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
        if (localStorage.getItem('token')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        return inject(Router).createUrlTree(['/auth/login']);

}
