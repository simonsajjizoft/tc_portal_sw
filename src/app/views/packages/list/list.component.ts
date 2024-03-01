import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import {PackagesSer}
import {PackagesService} from '../packages.service'
import { ApiService } from 'src/app/services/api.services';
import { environment } from 'src/environments/environment';

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
  searchValue = '';
  statusDropdown = false;
  statusList = [];
  packageDetails;
  detailsLoader:boolean = false;
  constructor(private router:Router,private http:HttpClient,private packageService:PackagesService,private apiService:ApiService){}

  ngOnInit(){
    this.loader = true;
    this.detailsLoader = true;
    this.fetchStatusList()
    let checkedList = [];
    checkedList = this.statusList.filter((item)=>item?.checked);
    this.packageService
    .getPackages(this.page,this.searchValue,checkedList)
    .subscribe((data:any) => {
      let packages = data?.data;
      this.packages = packages;
      if(this.packages?.length>0) this.getDetails(this.packages[0]);
      this.disableAllLoaders()
      console.log(this.packages)
    },
    (error)=>{
      this.disableAllLoaders()
    });
  }

  onScroll(): void {
    if(!this.isReachedLastPage){
      let checkedList = [];
      checkedList = this.statusList.filter((item)=>item?.checked).map((item2)=>{return item2?.statusId});
      this.packageService
      .getPackages(++this.page,this.searchValue,checkedList)
      .subscribe((data:any) => {
        let packages = data?.data;
        if(packages.length == 0) this.isReachedLastPage = true;
        else this.packages.push(...packages);
        console.log(packages)
      });
    }
  }

  searchList(event){
    console.log(event?.target?.value?.trim());
    this.searchValue = event?.target?.value?.trim();
    let checkedList = [];
    checkedList = this.statusList.filter((item)=>item?.checked).map((item2)=>{return item2?.statusId});
    console.log(checkedList)
    this.packageService
      .getPackages(1,this.searchValue,checkedList)
      .subscribe((data:any) => {
        this.packages = [];
        let packages:any[] = data?.data;
        // if(packages.length == 0) this.isReachedLastPage = true;
        this.packages.push(...packages);
        console.log(packages);
        this.disableAllLoaders()
      },
      (error)=>{
        this.disableAllLoaders()
      });
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

  fetchStatusList(){
    this.apiService.ExecutePost(environment?.apiUrl + 'status',{}).subscribe((data:any)=>{
      if(data?.data){
        this.statusList = data?.data;
        this.statusList.map((item)=>{
          item.checked = false;
        })
        console.log(this.statusList);
        
      }
      
    })
  }

  changeList(event){
    console.log(this.statusList);
    let checkedList = [];
    checkedList = this.statusList.filter((item)=>item?.checked).map((item2)=>{return item2?.statusId});
    console.log(checkedList)
    this.packageService
      .getPackages(1,this.searchValue,checkedList)
      .subscribe((data:any) => {
        this.packages = [];
        let packages:any[] = data?.data;
        // if(packages.length == 0) this.isReachedLastPage = true;
        this.disableAllLoaders()
        this.packages.push(...packages);
        console.log(packages)
      },
      (error)=>{
        this.disableAllLoaders();
      });
  }

  getDetails(pkg:any){
    let payload = {
      "objectId":  pkg?.packageId
    };
    
    this.detailsLoader = true;
    this.apiService.ExecutePost(environment?.apiUrl + 'get-package',payload).subscribe((data:any)=>{
      if(data?.data){
        console.log(data);
        this.packageDetails = data?.data;
      }
      this.detailsLoader = false;
    },
    (error)=>{
      this.detailsLoader = false;
    })

  }

  disableAllLoaders(){
    setTimeout(()=>{
      this.loader = false;
      this.detailsLoader = false;
    },1000);
  }


}
