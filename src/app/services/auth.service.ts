import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  avilableRoles = ['ADMIN'];
  constructor(private router:Router) { }

  isAuthenticated(){
    // let token = localStorage.getItem('userToken');
    let token = sessionStorage.getItem('userToken');
    if(token === null || !token) return false;
    else {
      // let decodedToken:any = jwt_decode(token);
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
}
