import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ExercisesService} from '../exercises.service'
import { ApiService } from 'src/app/services/api.services';
import { environment } from 'src/environments/environment';
import { GeneralService } from 'src/app/services/general.services';

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  loader;
  throttle = 50;
  distance = 2;
  page = 1;
  exercises: any[] = [];
  isReachedLastPage = false;
  searchValue = '';
  statusDropdown = false;
  statusList = [];
  exerciseDetails;
  detailsLoader:boolean = false;
  statusConfigs;
  @ViewChild('containerdetails') containerRef: ElementRef;
  @ViewChild('top') topRef: ElementRef;
  @ViewChild('bottom') bottomRef: ElementRef;
  bottomHeight;
  constructor(private router:Router,private http:HttpClient,private exerciseService:ExercisesService,private apiService:ApiService,private general:GeneralService){}

  ngOnInit(){
    this.loader = true;
    this.detailsLoader = true;
    this.fetchStatusList()
    let checkedList = [];
    this.statusConfigs = this.general.statusConfiguration;
    checkedList = this.statusList.filter((item)=>item?.checked);
    this.exerciseService
    .getExercises(this.page,this.searchValue,checkedList)
    .subscribe((data:any) => {
      let exercises = data?.data;
      this.exercises = exercises;
      if(this.exercises?.length>0) this.getDetails(this.exercises[0]);
      this.disableAllLoaders()
      console.log(this.exercises)
    },
    (error)=>{
      this.disableAllLoaders()
    });
  }

  ngAfterViewInit() {
    const containerHeight = this.containerRef.nativeElement.clientHeight;
    const topHeight = this.topRef.nativeElement.clientHeight;
    this.bottomHeight = `calc(${containerHeight}px - ${topHeight}px)`;
  }

  onScroll(): void {
    if(!this.isReachedLastPage){
      let checkedList = [];
      checkedList = this.statusList.filter((item)=>item?.checked).map((item2)=>{return item2?.statusId});
      this.exerciseService
      .getExercises(++this.page,this.searchValue,checkedList)
      .subscribe((data:any) => {
        let exercises = data?.data;
        if(exercises.length == 0) this.isReachedLastPage = true;
        else this.exercises.push(...exercises);
        console.log(exercises)
      });
    }
  }

  searchList(event){
    console.log(event?.target?.value?.trim());
    this.searchValue = event?.target?.value?.trim();
    let checkedList = [];
    checkedList = this.statusList.filter((item)=>item?.checked).map((item2)=>{return item2?.statusId});
    console.log(checkedList)
    this.exerciseService
      .getExercises(1,this.searchValue,checkedList)
      .subscribe((data:any) => {
        this.exercises = [];
        let exercises:any[] = data?.data;
        // if(exercises.length == 0) this.isReachedLastPage = true;
        this.exercises.push(...exercises);
        console.log(exercises);
        this.disableAllLoaders()
      },
      (error)=>{
        this.disableAllLoaders()
      });
  }

  createExercise() {
    // this.initialLoader = true;
    this.router.navigate(
      ['/exercises/create'] 
    );
  }

  navigateDetails(id){
    this.router.navigate(
      ['/exercises/details',id]
    );
  }

  fetchStatusList(){
    this.apiService.ExecuteGet(environment?.apiUrl + 'status').subscribe((data:any)=>{
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
    this.exerciseService
      .getExercises(1,this.searchValue,checkedList)
      .subscribe((data:any) => {
        this.exercises = [];
        let exercises:any[] = data?.data;
        // if(exercises.length == 0) this.isReachedLastPage = true;
        this.disableAllLoaders()
        this.exercises.push(...exercises);
        console.log(exercises)
      },
      (error)=>{
        this.disableAllLoaders();
      });
  }

  getDetails(ex:any){
    this.selectExercise(ex);
    this.detailsLoader = true;
    this.apiService.ExecuteGet(environment?.apiUrl + 'exercise'+ `?exerciseId=${ex?.exerciseId}`).subscribe((data:any)=>{
      if(data?.data){
        console.log(data);
        this.exerciseDetails = data?.data;
      }
      this.detailsLoader = false;
    },
    (error)=>{
      this.detailsLoader = false;
    })

  }

  selectExercise(ex){
    this.exercises.map((item:any)=>{
      item.selected = false;
    })
    ex.selected = true;
  }

  disableAllLoaders(){
    setTimeout(()=>{
      this.loader = false;
      this.detailsLoader = false;
    },1000);
  }


}
