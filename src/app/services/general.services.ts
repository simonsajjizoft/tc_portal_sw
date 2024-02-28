import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  userEmail: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private router: Router,) { }

  set setToken(token: any) {
    // localStorage.setItem('token', token);
    sessionStorage.setItem('token',token);
  }

  get getToken() {
    if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token')
    }
    else {
      return null
    }
  }

  get getUserName(){
    return this.userEmail;
  }

  setUserName(val:any) :void{
    this.userEmail.next(val)
  }


  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
}
