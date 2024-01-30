import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  
  constructor(private router:Router){}

  ngOnInit(){}

  createPackage() {
    // this.initialLoader = true;
    this.router.navigate(
      ['/templates/create'] 
    );
  }

}
