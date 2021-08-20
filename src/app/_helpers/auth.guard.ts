import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Role } from '@app/model';

import { AuthenticationService } from '../service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const   user                    = this.authenticationService.userValue;
        let     authorizedRoles: Role[] = route.data.roles;
        const   filteredArray           = authorizedRoles.filter(value => user.roles?.includes(value));

        if (user) {
            // check if route is restricted by role
            if (filteredArray.length != 0) {
                
                // role authorized so return true 
                return true;
            }

            this.router.navigate(['/']);
            return false;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}