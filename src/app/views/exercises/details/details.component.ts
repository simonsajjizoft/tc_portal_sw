import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.services';
import { ConfirmboxComponent } from 'src/app/shared/components/confirmbox/confirmbox.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
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
    exerciseInstruction:['',Validators.required],
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
    private route:ActivatedRoute
  ) {
    this.firstFormGroup.valueChanges.subscribe(value => {
      this.desc.nativeElement.style.height = 'auto';
      this.desc.nativeElement.style.height = `${this.desc.nativeElement.scrollHeight}px`;
    });
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      this.getDetails(this.id);
      this.fetchAllUsers();
      this.fetchStatusList();
    })
  }

  ngOnInit(): void {
    this.content = ''
    this.firstFormGroup.get("exerciseDescription").setValue(this.content);
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmboxComponent, {
      panelClass: 'custom-modalbox',
      data: { data: 'data' }
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe().subscribe(() => this.autosize.resizeToFitContent(true));
  }

  switchTab(tabNumber) {
    this.tab = tabNumber;
  }

  getDetails(id: any) {
    let payload = { "objectId": id };
    this.detailsLoader = true;
    this.apiService.ExecutePost(environment?.apiUrl + 'get-exercise', payload).subscribe((data: any) => {
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
    this.apiService.ExecutePost(environment?.apiUrl + 'status',{}).subscribe((data:any)=>{
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

  

}
