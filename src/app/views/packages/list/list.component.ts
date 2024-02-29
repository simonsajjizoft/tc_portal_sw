import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import {PackagesSer}
import {PackagesService} from '../packages.service'

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ListComponent {
  loader;
  throttle = 50;
  distance = 2;
  page = 1;
  packages: any[] = [];
  isReachedLastPage = false;
  constructor(private router:Router,private http:HttpClient,private packageService:PackagesService){}

  ngOnInit(){
    this.loader = true;
    setTimeout(()=>{
      this.loader = false;
    },2000);
    this.packageService
    .getPacakges(this.page)
    .subscribe((data:any) => {
      let packages = data?.data;
      this.packages = packages;
      console.log(this.packages)
    });
  }

  onScroll(): void {
    if(!this.isReachedLastPage){
      this.packageService
      .getPacakges(++this.page)
      .subscribe((packages: any[]) => {
        if(packages.length == 0) this.isReachedLastPage = true;
        else this.packages.push(...packages);
        console.log(packages)
      });
    }
  }

  createPackage() {
    // this.initialLoader = true;
    this.router.navigate(
      ['/packages/create'] 
    );
  }

  navigateDetails(){
    this.router.navigate(
      ['/packages/details'] 
    );
  }

  getCommentaries(page: number): Observable<Comment[]> {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/comments?page=${page}&per_page=10`
      ) as Observable<Comment[]>;
  }

}
