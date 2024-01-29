import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.services';
import { ApiConstant } from 'src/app/shared/apiconstants';

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
    this.loginLoader = true;
    this.loginApi();
  }

  loginApi() {
    this.userNavigation('/dashboard');
  } 

  userNavigation(station) {
    this.router.navigate([station]);
  }

}
