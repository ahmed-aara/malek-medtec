import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TokenPayload, TokenReponse, UserDetail } from '../Modal/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api: any = environment.api_url + 'api/auth/'

  private token: any = ''

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('token', token)
    this.token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token')
    }
    return this.token
  }

  private getUserDetail(): UserDetail {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null as any;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetail();
    if (user) {
      return user.exp > Date.now() / 10000
    } else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {

    const base = this.http.post(this.api + 'register',
      user, { headers: { 'Content-Type': 'application/json' } });

    const request = base.pipe(
      map((data: TokenReponse | any) => {
        if (data.token) {
          this.token = data.token
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;

  }

  public login(data:any): Observable<any> {
    const base = this.http.post(this.api + 'login', data, { headers: { 'Content-Type': 'application/json' } })

    const request = base.pipe(
      map((data: TokenReponse | any) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }

  public profile(): Observable<any> {
    return this.http.get(this.api + 'info', { headers: { Authorization: `Bearer ${this.getToken()}` } })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('admin')
    // this.router.navigateByUrl('/login')
  }

}
