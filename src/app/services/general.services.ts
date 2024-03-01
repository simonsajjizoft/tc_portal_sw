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
    return this.userEmail;
  }

  setUserName(val: any): void {
    this.userEmail.next(val)
  }

  get statusConfiguration() {
    return {
     "Review": {
        "statusId": "65cdb6535c7dba763748353b",
        "statusName": "Review",
        "bgColor":"bg-pink-100"
      },
      "Waiting for Approval":{
        "statusId": "65cdb59a5c7dba7637483538",
        "statusName": "Waiting for Approval",
        "bgColor":"bg-amber-50"
      },
      "Approved":{
        "statusId": "65cdb6715c7dba763748353c",
        "statusName": "Approved",
        "bgColor":"bg-green-100"
      },
      "Draft" :{
        "statusId": "65cdb5ea5c7dba7637483539",
        "statusName": "Draft",
        "bgColor":"bg-gray-100"
      },
      "Not Approved": {
        "statusId": "65cdb5f45c7dba763748353a",
        "statusName": "Not Approved",
        "bgColor":"bg-red-50"
      }
    }
  }


  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
}
