import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../Services/user-auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserAuthService);
  const router = inject(Router);
  if (
    authService.isLoggedIn &&
    JSON.parse(authService.isLoggedInUserName()).firstName == 'admin'
  ) {
    return true;
  } else {
    alert('Only for Admins');
    // alert(JSON.parse(authService.isLoggedInUserName()).firstName == 'admin');
    router.navigate(['/home']);
    return false;
  }
};
