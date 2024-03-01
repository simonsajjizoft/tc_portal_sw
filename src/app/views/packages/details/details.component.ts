import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmboxComponent } from 'src/app/shared/components/confirmbox/confirmbox.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  statusDropdown;
  content;
  descenabled = true;
  @ViewChild('desc') desc:ElementRef;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  private _ngZone: NgZone;
  constructor( 
    private _formBuilder: FormBuilder, 
    breakpointObserver: BreakpointObserver,
    private dialog:MatDialog
    ) { 
      this.firstFormGroup.valueChanges.subscribe(value => {
        this.desc.nativeElement.style.height = 'auto';
        this.desc.nativeElement.style.height = `${this.desc.nativeElement.scrollHeight}px`;

    })
    }

  ngOnInit(): void {
    this.content = 'foiqnfoqnjf oqnfoq fjo qfojn qojf q fqofnqo qpofqpmf pqijfpqmfkq fipq33nmfipq3nmfpiqnmfpin fqj foq fioqnfjq foiqnfqj foqnfjl qfj quiofnqofnqjl fqoi fqionfqio fqolnfoqn folqn folqnfoj qfq '
    this.firstFormGroup.get("description").setValue(this.content);
  }

  goStepForward(stepper:any){
    stepper.next();
  }

  goStepBack(stepper:any){
    stepper.previous();
  }

  checkNextStepActive(stepper):any{
    if(stepper?.selectedIndex == 0 && this.firstFormGroup?.valid) return true;
    else if(stepper?.selectedIndex == 0 && !this.firstFormGroup?.valid) return false;
    else if(stepper?.selectedIndex == 1 ) return false;
  }

  checkPrevStepActive(stepper):any{
    if(stepper?.selectedIndex == 1 ) return true;
    else if(stepper?.selectedIndex == 0 ) return false;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmboxComponent, {
      panelClass: 'custom-modalbox',
      data: { data:'data' }
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe().subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
