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
  ageList = [{'age':'4-6',selected:true},{'age':'6-8'}];
  firstFormGroup = this._formBuilder.group({
    exerciseName: ['', Validators.required],
    premiumPrice:['0',Validators.required],
    exerciseDescription: ['', Validators.required],
    ageGroup: [this.ageList[0]?.age, Validators.required],
    premiumStatus:[false, Validators.required],
    packageName:['',]
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


}
