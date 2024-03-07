import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmboxComponent } from 'src/app/shared/components/confirmbox/confirmbox.component';
import { PackagesService } from '../packages.service';
import { GeneralService } from 'src/app/services/general.services';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  ageList = [{'age':'4-6',selected:true},{'age':'6-8'}];
  firstFormGroup = this._formBuilder.group({
    packageName: ['', Validators.required],
    premiumPrice:['0',Validators.required],
    description: ['', Validators.required],
    ageGroup: [this.ageList[0]?.age, Validators.required],
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
    assignedBy:['']
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
  id;
  logs = [
    {time:'6 mins ago',user:'J',description:'Package 426246cerer55u status changed from Draft to Review'},
    {time:'05 Mar 2024',user:'J',description:'Assignee Changed from Joe Davis to Admin213'},
    {time:'03 Mar 2024',user:'A',description:'Package 426246cerer55u was updated at 5th Dec 2024 with status Draft.',
  contentchanged:'Description'},
  {time:'03 Mar 2024',user:'A',description:'Package 426246cerer55u was created at 5th Dec 2024 with status Draft.'},
  ];
  comments = [
    {time:'6 mins ago',user:'J',description:'Please do proceed with Approval',username:'josephkuruvilla@gmail.com'},
    {time:'05 Mar 2024',user:'A',description:'Assignee Changed from Joe Davis to Admin213',username:'admin123@gmail.com'},
    {time:'03 Mar 2024',user:'S',description:'The Exercises in  the Packages have been added to.',
  contentchanged:'Description',username:'sanjo@gmail.com'},
  ];
  isCommentActionsEnabled ;
  details;
  statusConfigs;
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
    private router:Router,
    private route:ActivatedRoute,
    private tostr:ToastrService
  ) {
    this.firstFormGroup.valueChanges.subscribe(value => {
      if(this.desc?.nativeElement){
        this.desc.nativeElement.style.height = 'auto';
        this.desc.nativeElement.style.height = `${this.desc.nativeElement.scrollHeight}px`;
      }
    })
    this.route.paramMap.subscribe( paramMap => {
      this.id = paramMap.get('id');
      this.getDetails(this.id);
      this.statusConfigs = this.general.statusConfiguration;
  })
  }

  ngOnInit(): void {
    this.content = ''
    this.firstFormGroup.get("description").setValue(this.content);
    this.getExercises();
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
    if(this.firstFormGroup.valid){
      const dialog = this.dialog.open(ConfirmboxComponent, {
        panelClass: 'dialog-ctn',
        data: { statusList:this.statusList,userList:this.userList,assignee:this.secondFormGroup?.get('assignedTo')?.value,statusId:this.secondFormGroup?.get('packageStatusId')?.value},
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
    .getApprovedExercises(this.page,"4-6")
    .subscribe((data:any) => {
      let exercises = data?.data;
     if(exercises?.length>0) this.exercises.push(...exercises);
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
        if(data?.data){
          if(exercises?.length == 0) this.isReachedLastPage = true;
          else this.exercises?.push(...exercises);
          // this.unselectAllExercises()
          console.log(exercises)
        }
  
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
    this.firstFormGroup.controls['ageGroup'].setValue(age?.age);
  }

  savePackage(data){
    console.log(data);
    let listIds:any = this.getSlectedExercisesIds();
    this.secondFormGroup.controls['exerciseId'].patchValue(listIds);
    this.secondFormGroup.controls['assignedTo'].patchValue(data?.assignee);
    this.secondFormGroup.controls['eventStatusId'].patchValue(data?.status?.statusId);
    this.secondFormGroup.controls['assignedBy'].patchValue(this.general.getUserName);
    // this.secondFormGroup.controls['createdUser'].patchValue('');
    console.log(this.firstFormGroup)
    let payload = {...this.firstFormGroup?.value,...this.secondFormGroup?.value};
    console.log(payload)
    payload.updatedUser = this.general.getUserName;
    payload.assignedBy = this.general.getUserName;
    console.log(payload);
    this.apiService.ExecutePut(environment?.apiUrl + 'package',payload).subscribe((data:any)=>{
      if(data?.data){
        console.log(data?.data); 
        this.tostr.success(data?.data)
      }
      else this.tostr.error(data?.data || data?.message)
    },
    (error)=>{
      this.tostr.error(data?.message || data?.error)
    })
  }

  getSlectedExercisesIds():any[]{
    let selectedExercises =  this.exercises.filter((item)=>{return item?.selected});
    return selectedExercises.map((item)=>{return item?.exerciseId}) || []
  }

  getDetails(id:any){
    let payload = {"objectId":  id};
    this.detailsLoader = true;
    this.apiService.ExecuteGet(environment?.apiUrl + 'package' + `?packageId=${id}`).subscribe((data:any)=>{
      if(data?.data){
        console.log(data);
        this.details = data?.data;
        this.updateFormValues(data?.data)
      }
      this.detailsLoader = false;
    },
    (error)=>{
      this.detailsLoader = false;
    })
  }

  updateFormValues(data){
    console.log(data);
    for (const key of Object.keys(data)) {
      if (this.firstFormGroup.get(key)) this.firstFormGroup.patchValue({ [key]: data[key] });
      if(this.secondFormGroup.get(key)) this.secondFormGroup.patchValue({ [key]: data[key] });
    }
   if(data?.tcExerciseResponseDtoList && data?.tcExerciseResponseDtoList?.length>0) {
     data?.tcExerciseResponseDtoList.map((item)=>{item.selected = true});
     this.exercises.unshift(...data?.tcExerciseResponseDtoList)
   }
   console.log(this.exercises)
    console.log(this.firstFormGroup?.value);
    console.log(this.secondFormGroup?.value);
  }

  showCommentButtons(){
    this.isCommentActionsEnabled = true;
  }


}
