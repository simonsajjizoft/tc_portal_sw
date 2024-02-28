import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.services';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  private unsubscribe = new Subject<void>();
  loginLoader: boolean = false
  formGroup: FormGroup;
  profileData: any
  isLoading: boolean = true;
  logedIn;
  showLoginForm;
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
    this.userName =  localStorage.getItem("userEmail");
    this.formGroup = this.formBuilder.group({
      username: [this.userName, Validators.compose([Validators.required, Validators.email]),],
      password: [null, Validators.required]
    });
  }

  get email(): any { return this.formGroup.get('username'); }

  get fControls(): any {
    return this.formGroup.controls;
  }

  submitClick(): void {
    this.loginLoader = true;
    // this.toaster.error("The Temperory password has been sent to Email");
    console.log(this.formGroup.value)
    this.apiService.LoginPost(`${environment.apiUrl}email`, this.formGroup.value).subscribe(data => {
      console.log(data);
      this.toaster.success("The Temperory password has been successfully sent to your email.")
      this.userNavigation('/resetpassword');
      this.generalService.setUserName(this.formGroup.controls['username'].value);
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
