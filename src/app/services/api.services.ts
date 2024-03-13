import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.apiUrl;
  authToken: any;
  constructor(private http: HttpClient) { }

  getToken() {
    if (this.authToken) return this.authToken;
    else {
      let token = localStorage.getItem('userToken');
      if (token === null) return '';
      else return token;
    }
  }

  getLoginToken() {
    let token = localStorage.getItem('userToken');
    if (token === null) return '';
    else return token;
  }

  setHeaders() {
    let header = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
    });
    return header;
  }

  setHeadersListing(){
    let header = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
    });
    return header;
  }

  setLoginHeaders() {
    let header = new HttpHeaders({
      'Authorization': `Bearer ${this.getLoginToken()}`,
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'X-Xss-Protection': '1; mode=block'
    });
    return header;
  }

  ExecuteGet(url: string, urlParam?: string, queryParam?: HttpParams): Observable<Object> {
    if (urlParam) {
      url = url + '/' + urlParam;
    }
    return this.http.get(url, { params: queryParam,headers: this.setHeaders() });
  }

  ExecutePost(url: string, data:any): Observable<Object> {
    return this.http.post(url, data, { headers: this.setHeaders() });
  }

  ExecutePut(url: string, body: any, urlParam?: string, queryParam?: HttpParams): Observable<Object> {
    if (urlParam) {
      url = url + '/' + urlParam;
    }
    return this.http.put(url, body, { params: queryParam,headers: this.setHeaders() });
  }

  ExecuteDelete(url: string,body?: any, urlParam?: string, queryParam?: HttpParams): Observable<Object> {
    if (urlParam) {
      url = url + '/' + urlParam;
    }
    return this.http.delete(url,{ headers: this.setHeaders(),body:body });
  }

  ExecutePatch(url: string, body: any, urlParam?: string, queryParam?: HttpParams): Observable<Object> {
    if (urlParam) {
      url = url + '/' + urlParam;
    }
    return this.http.patch(url, body, { params: queryParam });
  }

  LoginPost(url, data): Observable<any> {
    return this.http.post(url, data);
  }

authenticationService(username: String, password: String) {
  return this.http.get(`${environment?.authApiUrl}login`,
    { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
      this.registerSuccessfulLogin(username, password);
    }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem('userToken', username)
  }

  


}
