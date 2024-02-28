import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.services';
import { ApiConstant } from 'src/app/shared/apiconstants';
import { GeneralService } from 'src/app/services/general.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
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
    if (this.auth.isAuthenticated()) {
      let station = sessionStorage.getItem('currentStation');
      let userRole = sessionStorage.getItem('userRole');
      this.logedIn = false;
      this.userNavigation('/dashboard');
      if (!station) this.showLoginForm = true;
    } 
    else this.showLoginForm = true;
    this.userName =  localStorage.getItem("userEmail");
    this.formGroup = this.formBuilder.group({
      username: [this.userName, Validators.compose([Validators.required, Validators.email]),],
      password: ['', Validators.required]
    });
  }

  get email(): any { return this.formGroup.get('empEmail'); }

  get fControls(): any {
    return this.formGroup.controls;
  }

  submitClick(): void {
    this.loginLoader = true;
    this.loginApi();
  }

  loginApi() {
    this.apiService.LoginPost(`${environment.apiUrl}login`, this.formGroup.value).subscribe(data => {
      // this.wrongUser = false;
      if (data?.data) {
        this.generalService.setUserName(this.formGroup.value.username);
        localStorage.setItem("userEmail",this.formGroup.value.username);
        if(data?.data?.resetPasswordStatus)  this.userNavigation('/resetpassword');
        else{
          this.loginLoader = false;
          this.logedIn = true;
          localStorage.setItem('userToken', data?.data?.token);
          console.log(this.formGroup.value.username)
          // localStorage.removeItem('invalidLoginStatus');
          this.userNavigation('/dashboard');
        }
      }
      else{
        this.loginLoader = false;
        console.log(data?.data?.error )
        this.toaster.error(data?.error || data?.message)
      }
    }, (err) => {
      // this.wrongUser = true;
      this.loginLoader = false;
      console.log(err?.error )
      this.toaster.error(err?.error || err)
      // if (err?.error?.blocked) this.accBlocked = true;
      // if (!err?.error?.blocked && err?.error?.status === false) {
      //   this.setInvalidLogin();
      //   this.accBlocked = false;
      // }
    })


  } 

  userNavigation(station) {
    this.router.navigate([station]);
  }

}
