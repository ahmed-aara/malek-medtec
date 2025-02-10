import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class IsNotLoginService {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate() {
        if (this.auth.isLoggedIn()) {
            this.router.navigateByUrl('')
            return false
        }
        return true
    }
}
