import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.services';
import { GeneralService } from 'src/app/services/general.services';
import { ConfirmboxComponent } from 'src/app/shared/components/confirmbox/confirmbox.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
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
  tab = 0;
  detailsLoader;
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
  details;
  isCommentActionsEnabled ;
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
      this.desc.nativeElement.style.height = 'auto';
      this.desc.nativeElement.style.height = `${this.desc.nativeElement.scrollHeight}px`;
    });
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      this.fetchAgeList();
      this.getDetails(this.id);
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
    if(this.firstFormGroup.valid){
      const dialog = this.dialog.open(ConfirmboxComponent, {
        panelClass: 'dialog-ctn',
        data: { statusList:this.statusList,userList:this.userList,assignee:this.secondFormGroup?.get('assignedTo')?.value,statusId:this.secondFormGroup?.get('exerciseStatusId')?.value},
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

  switchTab(tabNumber) {
    this.tab = tabNumber;
  }

  getDetails(id: any) {
    this.detailsLoader = true;
    this.apiService.ExecuteGet(environment?.apiUrl + 'exercise'+ `?exerciseId=${id}`).subscribe((data: any) => {
      if (data?.data) {
        console.log(data);
        this.details = data?.data;
        this.updateFormValues(data?.data)
      }
      this.detailsLoader = false;
    },
      (error) => {
        this.detailsLoader = false;
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

  updateFormValues(data){
    console.log(data);
    for (const key of Object.keys(data)) {
      if (this.firstFormGroup.get(key)) this.firstFormGroup.patchValue({ [key]: data[key] });
      if(this.secondFormGroup.get(key)) this.secondFormGroup.patchValue({ [key]: data[key] });
    }
    console.log(this.firstFormGroup?.value);
    console.log(this.secondFormGroup?.value);
  }

  showCommentButtons(){
    this.isCommentActionsEnabled = true;
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
    this.apiService.ExecutePut(environment?.apiUrl + 'exercise',payload).subscribe((data:any)=>{
      if(data?.data){
        console.log(data?.data); 
        this.tostr.success(data?.data);
        this.router.navigate(
          ['/exercises'] 
        );
      }
      else this.tostr.error(data?.data || data?.message)
    },
    (error)=>{
      this.tostr.error(data?.message || data?.error)
    })
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
