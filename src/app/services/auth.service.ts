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
    // let data = { token: localStorage.getItem('userToken') ? localStorage.getItem('userToken') : '' };
    let data = {token:'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJzaW1vbi5zYWppbWF0aGV3c0B6b2Z0c29sdXRpb25zLmNvbSo2NWQ3MmJlNTYyNGE2YzRmNzVhOTExZWQiLCJhdWQiOiJzY2hvb2x3aXphcmQtdXNlcnMiLCJuYmYiOjE3MDkwNDUzMDUsImlzcyI6Imh0dHA6Ly93d3cuc2Nob29sd2l6YXJkLmNvbSIsIlJvbGVzIjpbIlRDIl0sImV4cCI6MTcwOTA1MzMxMiwiaWF0IjoxNzA5MDQ5NzEyLCJqdGkiOiIyMTkxYjY4MC1kYzZhLTQ3NTAtOGEwMi0yY2VkZmQyNTdlODYifQ.ExkwsP02Wy6sAEIkFj1BdF-vyjj-X7GEI7q98uYJZHJo49b_WTQsApVBKFWUhwWaWxD1bX8AvCLSLMNFv-rqrlBWa4nDmQuG-76yLICHacijOs_uWkKqKxGRoKJLQ3mcr913HsMC0f5-iCybfOiDfZq8pfLMVWbN9l-EiK0KXB893-tEwERNGQsKAkHL6l5QcrdhlRzR_9Z9cIcMVBf23LVYh__XncWlBzdWLofJIiMdbj7MIuHhJTZjpfkwpwVexGXDkqP1q971jjstmPjvJxObwyUhxmWIKUkLt6ONsSb9gmLZzA6ufixmY7VLBJBXfzonM6f_SJQUlvdXQjBlcw'};

    return this.http.post<any>(url, data).pipe(
      map(response => {
        // Assuming the response contains the new access token
        // You should adjust this according to your API response
        const newUserToken = response.data;
        // Save the new access token to local storage or wherever you store tokens
        localStorage.setItem('userToken', newUserToken);
        return newUserToken;
      })
    );
  }

  getAccessToken(): string | null {
    // Retrieve access token from local storage or wherever you store tokens
    return localStorage.getItem('userToken');
  }
}
