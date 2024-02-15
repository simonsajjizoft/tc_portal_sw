import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  firstFormGroup = this._formBuilder.group({
    username: ['', Validators.required],
    role: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  public Editor = ClassicEditorBuild;
  statusDropdown;
  content;
  descenabled = true;
  @ViewChild('desc') desc: ElementRef;
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

}
