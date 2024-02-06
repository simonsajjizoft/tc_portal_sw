import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
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

  createTemplate() {
    this.router.navigate(
      ['/templates/create'] 
    );
  }

  navigateDetails(){
    this.router.navigate(
      ['/templates/details'] 
    );
  }


}
