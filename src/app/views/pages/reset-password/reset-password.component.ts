import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.services';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  private unsubscribe = new Subject<void>();
  loginLoader: boolean = false
  formGroup: FormGroup;
  profileData: any
  isLoading: boolean = true;
  logedIn;
  showLoginForm;
  subscription:Subscription;
  userName;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private changeDetector: ChangeDetectorRef,
    public auth: AuthService,
    private apiService:ApiService,
    private generalService:GeneralService

  ) {
    this.generalService.userEmail.subscribe((data) => {
      if(data) this.userName = data;
    });
    if(!this.userName || this.userName==undefined) this.userName =  localStorage.getItem("userEmail");
    this.formGroup = this.formBuilder.group({
      username: [this.userName, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      newPassword:[null, Validators.required],
      confirmedNewPassword:[null, Validators.required],
    });
    this.formGroup.controls['username'].disable();
  }

  get email(): any { return this.formGroup.get('username'); }

  get fControls(): any {
    return this.formGroup.controls;
  }

  submitClick(): void {
    console.log(this.formGroup?.value)
     this.apiService.LoginPost(`${environment.apiUrl}reset-password`, this.formGroup.getRawValue()).subscribe(data => {
      console.log(data);
     if(data?.data){
      this.toaster.success("The Password has been reset successfully.")
      this.userNavigation('/login');
     }
     else{
      this.toaster.error(data?.message)
     }
    }, (err) => {
      this.loginLoader = false;
      console.log(err?.error )
      this.toaster.error(err?.error || err)
    })

  }

  loginApi() {
    this.userNavigation('/dashboard');
  } 

  userNavigation(station) {
    this.router.navigate([station]);
  }


}
