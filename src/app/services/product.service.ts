import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api: any = environment.api_url + 'api/product/'

  constructor(private http: HttpClient) { }

  all(): Observable<any> {
    return this.http.get(this.api + 'all')
  }

  get(): Observable<any> {
    return this.http.get(this.api + 'get')
  }

  one(id: string): Observable<any> {
    return this.http.get(this.api + id)
  }

  update(id: string, data: any) {
    return this.http.put(this.api + 'update/' + id, data)
  }
}
