import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  ExecuteGet(url: string, urlParam?: string, queryParam?: HttpParams): Observable<Object> {
    if (urlParam) {
      url = url + '/' + urlParam;
    }
    return this.http.get(url, { params: queryParam });
  }

  ExecutePost(url: string, body: any, urlParam?: string, queryParam?: HttpParams): Observable<Object> {
    if (urlParam) {
      url = url + '/' + urlParam;
    }
    return this.http.post(url, body, { params: queryParam });
  }

  ExecutePut(url: string, body: any, urlParam?: string, queryParam?: HttpParams): Observable<Object> {
    if (urlParam) {
      url = url + '/' + urlParam;
    }
    return this.http.put(url, body, { params: queryParam });
  }

  ExecuteDelete(url: string, urlParam?: string, queryParam?: HttpParams): Observable<Object> {
    if (urlParam) {
      url = url + '/' + urlParam;
    }
    return this.http.delete(url, { params: queryParam });
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
