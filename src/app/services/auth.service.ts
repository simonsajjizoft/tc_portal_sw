import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  avilableRoles = ['ADMIN'];
  baseUrl = environment.apiUrl;
  authToken: any;
  constructor(private router:Router,private http: HttpClient) { }

  isAuthenticated(){
    let token = sessionStorage.getItem('userToken');
    if(token === null || !token) return false;
    else {
      return true
    }
  }

  getUser(){
    // let token = localStorage.getItem('userToken');
    let token = sessionStorage.getItem('userToken');
    // if(token === null) return false;
    // else return jwt_decode(token);
  }

  logOut(){
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userToken");
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  refreshToken(): Observable<any> {
    // Assuming your refresh token API returns a new access token
    // You should replace this with your actual refresh token API call
    let url = environment.apiUrl + 'refresh-token';
    let data = { token: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : '' };
    return this.http.post<any>(url, data).pipe(
      map(response => {
        const newUserToken = response.data;
        localStorage.setItem('userToken', newUserToken);
        return newUserToken;
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem('userToken');
  }
}
