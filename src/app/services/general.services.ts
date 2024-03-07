import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  userEmail: BehaviorSubject<any> = new BehaviorSubject<any>({});
  statusConfigs: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private router: Router,) { }

  set setToken(token: any) {
    // localStorage.setItem('token', token);
    sessionStorage.setItem('token', token);
  }

  get getToken() {
    if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token')
    }
    else {
      return null
    }
  }

  get getUserName() {
    return localStorage.getItem("userEmail");
  }

  setUserName(val: any): void {
    this.userEmail.next(val)
  }

  get statusConfiguration() {
    return {
     "In Progress": {
        "statusId": "65cdb5ea5c7dba7637483539",
        "statusName": "In Progress",
        "bgColor":"bg-blue-50",
        "textColor":"text-blue-700"
      },
      "Review":{
        "statusId": "65cdb6535c7dba763748353b",
        "statusName": "Review",
        "bgColor":"bg-pink-50",
        "textColor":"text-pink-400"
      },
      "Approved":{
        "statusId": "65cdb6715c7dba763748353c",
        "statusName": "Approved",
        "bgColor":"bg-emerald-50",
        "textColor":"text-green-700"
      },
    }
  }

  get UserRole(){
    return localStorage.getItem("TCuserRole");
  }


  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
}
