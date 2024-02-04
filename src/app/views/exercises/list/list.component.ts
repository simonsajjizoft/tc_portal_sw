import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
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

  createExercise() {
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
