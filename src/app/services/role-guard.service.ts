import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { GeneralService } from './general.services';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{
  constructor(public auth: AuthService, public router: Router, private route: ActivatedRoute,private general:GeneralService) {
  }

  canActivate(route: ActivatedRouteSnapshot): any {
    let roles = route.data['role'];
    console.log(this.auth.isAuthenticated())
    if (!this.auth.isAuthenticated() || this.general.UserRole!='super_admin') {
      this.router.navigate(['']);
      return false;
    } else {
      return true;
      // let roleCheck = false;
      // let userRole = localStorage.getItem('currentStation');
      // const stationParam = route?.queryParams['station'];
      //   if (stationParam && stationParam !== userRole) {
      //     localStorage.setItem('currentStation', stationParam);
      //     sessionStorage.clear();
      //     userRole = stationParam;
      //   }
      //   let userPermission: any = localStorage.getItem('userPermission');
      //   if (userPermission) userPermission = JSON.parse(userPermission);
      //   for (let val in userPermission) {
      //     if (userRole === val && userPermission[val] !== 'NA') roleCheck = true;
      //   }
      //   if (roleCheck) {
      //     let permissionCheck: boolean = false;
      //     roles?.forEach(element => {
      //       if (userRole === element) permissionCheck = true;
      //     });
      //     if (permissionCheck) return true;
      //     else this.router.navigate(['']);
      //   }
      //   else {
      //     localStorage.clear();
      //     this.router.navigate(['']);
      //   }
    }
  }
}
