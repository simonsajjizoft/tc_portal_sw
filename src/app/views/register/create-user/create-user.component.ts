import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as ClassicEditorBuild from 'ckeditor5-build-classic/build/ckeditor';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  registerFG = this._formBuilder.group({
    username: ['', Validators.required],
    role: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  public Editor = ClassicEditorBuild;
  statusDropdown;
  content;
  descenabled = true;
  roles = ["SUPER_ADMIN", "TC"]
  @ViewChild('desc') desc: ElementRef;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  private _ngZone: NgZone;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private toastr:ToastrService,
    private apiService:ApiService
  ) {
    this.registerFG.valueChanges.subscribe(value => {
      // this.desc.nativeElement.style.height = 'auto';
      // this.desc.nativeElement.style.height = `${this.desc.nativeElement.scrollHeight}px`;

    })
  }

  submit(){
    this.apiService.ExecutePost(`${environment.apiUrl}super-admin/signup`, this.registerFG.value).subscribe(data => {
      if (data) {
        console.log(data)
  
      }
    }, (err) => {
      console.log(err);
      this.toastr.error(err || err?.error)
    })
  }

}
