import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeneralService {
//   unreadMessage = new BehaviorSubject(null)
  constructor(private router: Router,) { }

//   private getS3Bucket(): any {
//     const bucket = new S3(environment.s3config);
//     return bucket;
//   }

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

 


  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/'])
  }
}
