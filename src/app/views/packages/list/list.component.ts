import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ListComponent {
  loader;
  constructor(private router:Router){}

  ngOnInit(){
    this.loader = true;
    setTimeout(()=>{
      this.loader = false;
    },2000)
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

}
