import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class IsAdminService {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('admin') !== 'true') {
            this.router.navigateByUrl('/')
            return false
        }
        return true
    }
}
