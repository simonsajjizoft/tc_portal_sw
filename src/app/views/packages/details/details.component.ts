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
  ageList = [];
  firstFormGroup = this._formBuilder.group({
    packageId: [''],
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
    createdDate:[''],
    updatedDate:[''],
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
  id;
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
    .getApprovedExercises(this.page,this.firstFormGroup?.value?.ageGroup )
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
      .getApprovedExercises(++this.page,this.firstFormGroup?.value?.ageGroup )
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
    // this.secondFormGroup.controls['createdUser'].patchValue('');
    console.log(this.firstFormGroup);
    let commentObj:any = {
      "comment": data?.comment,
      "commentDate": new Date(),
      "commentUser": this.general.getUserName
    }
    this.secondFormGroup.controls['commentDocument'].patchValue(commentObj);
    let payload = {...this.firstFormGroup?.value,...this.secondFormGroup?.value};
    console.log(payload)
    payload.updatedUser = this.general.getUserName;
    payload.assignedBy = this.general.getUserName;
    if(commentObj?.comment=='' || !commentObj?.comment) delete payload.commentDocument;

    console.log(payload)
    this.apiService.ExecutePut(environment?.apiUrl + 'package',payload).subscribe((data:any)=>{
      if(data?.data){
        console.log(data?.data); 
        this.tostr.success(data?.data);
        this.router.navigate(
          ['/packages'] 
        );
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


  fetchAgeList(){
    this.apiService.ExecuteGet(environment?.apiUrl + 'age-group').subscribe((data:any)=>{
      if(data?.data){
        this.ageList = data?.data;
        this.ageList.map((item)=>{
          item.selected = false;
        });
      }
    })

  }


}
