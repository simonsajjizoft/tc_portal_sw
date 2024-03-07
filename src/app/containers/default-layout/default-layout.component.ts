import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { navItems } from './_nav';
import { Router, NavigationEnd } from '@angular/router'; 
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.services';
import { isThisTypeNode } from 'typescript/lib/tsserverlibrary';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  currentRoute;
  @ViewChild('recentitems') recentitems : ElementRef;
  recentItemsWidth;
  loader;
  data;
  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }
  public navItems = navItems;
  public unfoldable;
  public currentWindowWidth: number;
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(public router:Router,private apiService:ApiService) {
    this.router.events.subscribe((event) => {      
       event instanceof NavigationEnd ? this.currentRoute = event?.url : null });
    this.getMenu();
  }

  ngOnInit() {
    this.currentWindowWidth = window.innerWidth;
  }

  detectSidebarChanges(event){}

  toggleUnfoldable(){
    if(this.currentWindowWidth > 1320){
      this.unfoldable = !this.unfoldable;
    }
  }

  navigate(route){
    this.router.navigate([route])
  }

  getMenu(){
    this.loader = true;
    let role = localStorage.getItem("TCuserRole");
    role = role=='tc' ? 'tc' : (role=='super_admin' ? 'super-admin': role )
    let URL = environment?.apiUrl + `${role}/menu`; // here we have to change api based on whether role is admin or tc
    this.apiService.ExecuteGet(URL).subscribe((data: any) => {
      console.log(data);
      if(data?.data) this.data = data?.data?.topActivitiesDto;
      this.loader = false;
    }, (err) => {
      this.loader = false;
    })
  }
  
}
