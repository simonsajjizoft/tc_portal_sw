import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmboxComponent } from 'src/app/shared/components/confirmbox/confirmbox.component';
import { environment } from 'src/environments/environment';
import { PackagesService } from '../packages.service';
import { GeneralService } from 'src/app/services/general.services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent {
  ageList = [];
  firstFormGroup = this._formBuilder.group({
    packageName: ['', Validators.required],
    premiumPrice:['0',Validators.required],
    description: ['', Validators.required],
    ageGroup: ['', Validators.required],
    premiumStatus:[false, Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    assignedTo:['', Validators.required],
    updatedUser:['', Validators.required],
    createdUser:['', Validators.required],
    eventStatusId:['', Validators.required],
    exerciseId:[[],Validators.required],
    packageStatus:[[]],
    packageStatusId:[''],
    assignedBy:[''],
    commentDocument:['']
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  statusDropdown;
  content;
  descenabled = true;
  loader;
  throttle = 50;
  distance = 2;
  page = 1;
  exercises: any[] = [];
  isReachedLastPage = false;
  searchValue = '';
  detailsLoader:boolean = false;
  selectedExercises:any = [];
  statusList;
  userList;
  ageDropdown;
  @ViewChild('desc') desc: ElementRef;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  private _ngZone: NgZone;
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private apiService:ApiService,
    private packageService:PackagesService,
    private general:GeneralService,
    private tostr:ToastrService,
    private router:Router
  ) {
    this.firstFormGroup.valueChanges.subscribe(value => {
      if(this.desc?.nativeElement){
        this.desc.nativeElement.style.height = 'auto';
        this.desc.nativeElement.style.height = `${this.desc.nativeElement.scrollHeight}px`;
      }
    })
  }

  ngOnInit(): void {
    this.content = ''
    this.firstFormGroup.get("description").setValue(this.content);
    this.getExercises();
    this.fetchAgeList();
    this.fetchAllUsers();
    this.fetchStatusList();
  }

  goStepForward(stepper: any) {
    stepper.next();
  }

  goStepBack(stepper: any) {
    stepper.previous();
  }

  checkNextStepActive(stepper): any {
    if (stepper?.selectedIndex == 0 && this.firstFormGroup?.valid) return true;
    else if (stepper?.selectedIndex == 0 && !this.firstFormGroup?.valid) return false;
    else if (stepper?.selectedIndex == 1) return false;
  }

  checkPrevStepActive(stepper): any {
    if (stepper?.selectedIndex == 1) return true;
    else if (stepper?.selectedIndex == 0) return false;
  }

  openDialog(): void {
    // this.savePackage()
    if(this.firstFormGroup.valid ){
      const dialog = this.dialog.open(ConfirmboxComponent, {
        panelClass: 'dialog-ctn',
        data: { statusList:this.statusList,userList:this.userList,assignee:this.general.getUserName},
      });
      dialog.afterClosed().subscribe(data => {
        if(data){
          console.log(data);
          this.savePackage(data);
          
        }
  
      });
    }
    else this.tostr.warning("Please do enter the required fields before saving.")
   
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe().subscribe(() => this.autosize.resizeToFitContent(true));
  }

  getExercises(){
    this.packageService
    .getApprovedExercises(this.page,this.firstFormGroup.get("ageGroup").value)
    .subscribe((data:any) => {
      let exercises = data?.data;
      this.exercises = exercises;
      this.disableAllLoaders()
      console.log(this.exercises);
      // this.unselectAllExercises()
    },
    (error)=>{
      this.disableAllLoaders()
    });
  }

  onScroll(): void {
    if(!this.isReachedLastPage){
      this.packageService
      .getApprovedExercises(++this.page,"4-6")
      .subscribe((data:any) => {
        let exercises = data?.data;
        if(exercises){
          if(exercises?.length == 0) this.isReachedLastPage = true;
          else this.exercises.push(...exercises);
        }
     
        // this.unselectAllExercises()
        console.log(exercises)
      });
    }
  }

  disableAllLoaders(){
    setTimeout(()=>{
      this.loader = false;
      this.detailsLoader = false;
    },1000);
  }

  selectExercise(exercise){
    exercise.selected = true;
  }

  unselectAllExercises(){
    this.exercises.map((item)=>{item.selected = false});
  }

  unselectExercise(item){
    item.selected = false;
  }

  isAnyExerciseSelected():boolean{
    if(this.exercises) return this.exercises?.filter((item)=>{return item?.selected}).length==0;
    else return false;
  }

  getSelectedExercises(){
    if(this.exercises)  return this.exercises.filter((item)=>{return item?.selected})
    else return []
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

  fetchAllUsers(){
    this.apiService.ExecutePost(environment?.apiUrl + 'user/all',{}).subscribe((data:any)=>{
      if(data?.data){
        this.userList = data?.data;
        console.log(this.statusList);
        
      }
      
    })

  }

  selectAgeGroup(age){
    this.ageList.map((item:any)=>item.selected = false)
    age.selected = true;
    this.firstFormGroup.controls['ageGroup'].setValue(age?.ageGroup);
    this.exercises = [];
    this.page = 1;
    this.getExercises();
  }

  savePackage(data){
    console.log(data);
    let listIds:any = this.getSlectedExercisesIds();
    this.secondFormGroup.controls['exerciseId'].patchValue(listIds);
    this.secondFormGroup.controls['assignedTo'].patchValue(data?.assignee);
    this.secondFormGroup.controls['eventStatusId'].patchValue(data?.status?.statusId);
    this.secondFormGroup.controls['assignedBy'].patchValue(this.general.getUserName);
    this.secondFormGroup.controls['createdUser'].patchValue(this.general.getUserName);
    this.secondFormGroup.controls['updatedUser'].patchValue(this.general.getUserName);
    let commentObj:any = {
      "comment": data?.comment,
      "commentDate": new Date(),
      "commentUser": this.general.getUserName
    }
    this.secondFormGroup.controls['commentDocument'].patchValue(commentObj);
    
    let payload = {...this.firstFormGroup?.value,...this.secondFormGroup?.value};
    console.log(payload);
  
    this.apiService.ExecutePost(environment?.apiUrl + 'package',payload).subscribe((data:any)=>{
      if(data){
        console.log(data?.data); 
        this.tostr.success(data?.data);
        this.router.navigate(
          ['/packages'] 
        );
      }
      else this.tostr.error(data?.data || data?.message)
    },(error)=>{
       this.tostr.error(data?.message || data?.error)
    })
  }

  getSlectedExercisesIds():any[]{
    if(this.exercises){
      let selectedExercises =  this.exercises?.filter((item)=>{return item?.selected});
      return selectedExercises.map((item)=>{return item?.exerciseId}) || []
    }
    else return []

  }

  fetchAgeList(){
    this.apiService.ExecuteGet(environment?.apiUrl + 'age-group').subscribe((data:any)=>{
      if(data?.data){
        this.ageList = data?.data;
        console.log(this.ageList)
        this.ageList.map((item)=>{
          item.selected = false;
        });
        this.firstFormGroup.controls['ageGroup'].patchValue(this.ageList[0]?.ageGroup);
      }
    })

  }

}
