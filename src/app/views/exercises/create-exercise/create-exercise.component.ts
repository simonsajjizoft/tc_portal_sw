import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { Observable } from 'rxjs';
import { ConfirmboxComponent } from 'src/app/shared/components/confirmbox/confirmbox.component';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { GeneralService } from 'src/app/services/general.services';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.services';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent {
  ageList = [];
  firstFormGroup = this._formBuilder.group({
    exerciseName: ['', Validators.required],
    premiumPrice:['0',Validators.required],
    exerciseDescription: ['', Validators.required],
    ageGroup: ['', Validators.required],
    premiumStatus:[false, Validators.required],
    skillType:['', Validators.required],
    bonus:[false, Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    assignedTo:['', Validators.required],
    updatedUser:['', Validators.required],
    createdUser:['', Validators.required],
    eventStatusId:['', Validators.required],
    instruction:['',Validators.required],
    assignedBy:[''
    ],
    exerciseStatusId:[''],
    exerciseStatus:[''],
    fileURL:[''],
    packageId:[''],
    templateId:[''],
    templateName:[''],
    updatedDate:[''],
    packageName:['',]

  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  public Editor = ClassicEditorBuild;
  statusDropdown;
  content;
  descenabled = true;
  details;
  isCommentActionsEnabled ;
  statusList;
  userList;
  ageDropdown;
  loader;
  throttle = 50;
  distance = 2;
  page = 1;
  exercises: any[] = [];
  @ViewChild('desc') desc: ElementRef;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  private _ngZone: NgZone;
  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private apiService: ApiService,
    private route:ActivatedRoute,
    private tostr:ToastrService,
    private general:GeneralService,
    private router:Router
  ) {
    this.firstFormGroup.valueChanges.subscribe(value => {
      if(this.desc?.nativeElement){
        this.desc.nativeElement.style.height = 'auto';
        this.desc.nativeElement.style.height = `${this.desc.nativeElement.scrollHeight}px`;
      }

    });
    this.route.paramMap.subscribe(paramMap => {
      this.fetchAllUsers();
      this.fetchAgeList();
      this.fetchStatusList();
    })
  }

  ngOnInit(): void {
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
          this.saveExercise(data);
        }
  
      });
    }
    else this.tostr.warning("Please do enter the required fields before saving.")
   
  }


  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe().subscribe(() => this.autosize.resizeToFitContent(true));
  }

  saveExercise(data){
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
    this.apiService.ExecutePost(environment?.apiUrl + 'exercise',payload).subscribe((data:any)=>{
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

  onScroll(): void {
    // if(!this.isReachedLastPage){
    //   this.packageService
    //   .getApprovedExercises(++this.page,"4-6")
    //   .subscribe((data:any) => {
    //     let exercises = data?.data;
    //     if(exercises){
    //       if(exercises?.length == 0) this.isReachedLastPage = true;
    //       else this.exercises.push(...exercises);
    //     }
     
    //     // this.unselectAllExercises()
    //     console.log(exercises)
    //   });
    // }
  }


}
