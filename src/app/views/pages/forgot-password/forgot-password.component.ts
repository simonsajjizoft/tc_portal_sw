import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.services';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private changeDetector: ChangeDetectorRef,
    public auth: AuthService,
    private apiService:ApiService

  ) {
    if (this.auth.isAuthenticated()) {
      let station = sessionStorage.getItem('currentStation');
      let userRole = sessionStorage.getItem('userRole');
      this.logedIn = false;
      this.userNavigation(station);
      if (!station) this.showLoginForm = true;
    } else this.showLoginForm = true;
    this.formGroup = this.formBuilder.group({
      empEmail: [null, Validators.compose([Validators.required, Validators.email]),],
      empPassword: [null, Validators.required]
    });
  }

  get email(): any { return this.formGroup.get('empEmail'); }

  get fControls(): any {
    return this.formGroup.controls;
  }

  submitClick(): void {
    this.toaster.success("The Temperory password has been sent to Email")
    this.userNavigation('/resetpassword');
  }

  loginApi() {
    this.userNavigation('/dashboard');
  } 

  userNavigation(station) {
    this.router.navigate([station]);
  }


}
