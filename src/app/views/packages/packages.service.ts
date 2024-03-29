import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.services';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(private http: HttpClient,private apiService:ApiService ) {}
  getPackages(page: number,searchValue:string,statusList:any[]): Observable<any[]> {
    let role = localStorage.getItem("TCuserRole");
    role = role=='tc' ? 'tc' : (role=='super_admin' ? 'super-admin': role )
    return this.apiService.ExecutePost(
      environment?.apiUrl +  `${role}/packages` +`?page=${page}&size=10`,{
        "username": localStorage?.getItem("userEmail") ? localStorage?.getItem("userEmail") : '',
        "eventStatusId":statusList,
        "searchValue":searchValue
    }
      ) as Observable<any[]>;
  }

  getApprovedExercises(page: number,ageGroup): Observable<any[]> {
    let role = localStorage.getItem("TCuserRole");
    role = role=='tc' ? 'tc' : (role=='super_admin' ? 'super-admin': role )
    return this.apiService.ExecutePost(
      environment?.apiUrl +  `age-group/approved-exercises` +`?page=${page}&size=10`,{
        "ageGroup": ageGroup,
    }
      ) as Observable<any[]>;
  }
}
