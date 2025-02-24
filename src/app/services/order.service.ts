import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private api: any = environment.api_url + 'api/order/'

  constructor(private http: HttpClient) { }

  add(data: any) {
    return this.http.put(this.api + 'add/', data)
  }
}
