import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmboxComponent } from 'src/app/shared/components/confirmbox/confirmbox.component';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent {
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
  constructor( 
    private _formBuilder: FormBuilder, 
    breakpointObserver: BreakpointObserver,
    private dialog:MatDialog
    ) { }

  ngOnInit(): void {
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

}
