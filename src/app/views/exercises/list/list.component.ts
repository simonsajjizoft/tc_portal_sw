import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(private router:Router){}

  ngOnInit(){}

  createExercise() {
    // this.initialLoader = true;
    this.router.navigate(
      ['/exercises/create'] 
    );
  }

  navigateDetails(){
    this.router.navigate(
      ['/exercises/details'] 
    );
  }

}
