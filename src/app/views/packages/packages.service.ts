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
  getPacakges(page: number): Observable<any[]> {
    return this.apiService.ExecutePost(
      environment?.apiUrl +  `tc/packages` +`?page=${page}&size=10`,{
        "username": "simon.sajimathews@zoftsolutions.com",
        "eventStatusId":[],
        "searchValue":""
    }
      ) as Observable<any[]>;
  }
}
