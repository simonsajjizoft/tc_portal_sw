import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { navItems } from './_nav';
import { Router, NavigationEnd } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  currentRoute;
  @ViewChild('recentitems') recentitems : ElementRef;
  recentItemsWidth;
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

  constructor(public router:Router) {
    this.router.events.subscribe((event) => {      
       event instanceof NavigationEnd ? this.currentRoute = event?.url : null })
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
    console.log(route)
    this.router.navigate([route])
  }
  
}
