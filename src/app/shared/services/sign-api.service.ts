import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SignAPIService {
  private url = 'https://buscacat-api.herokuapp.com';

  constructor(private http: HttpClient) {}

  getUser(username: string, password: string): Observable<any> {
    return this.http.get(`${this.url}/${username}?password=${password}`);
  }

  postUser(username: string, password: string): Observable<any> {
    return this.http.post(this.url, {
      username: username,
      password: password,
    });
  }

  getToken(token: string): Observable<any> {
    return this.http.get(`${this.url}/token/${token}`);
  }

  deleteToken(token: string): Observable<any> {
    return this.http.delete(`${this.url}/token/${token}`);
  }
}
