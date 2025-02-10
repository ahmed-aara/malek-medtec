import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class IsLoginService {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        if (!this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/')
            return false
        }
        return true
    }
}
