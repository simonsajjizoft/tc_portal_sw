import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.services';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  public userName;
  public userRole;
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5);
  statusDropdown;
  @ViewChild('drpdown') drpdown:ElementRef;

  constructor(private classToggler: ClassToggleService,private authService :AuthService,private general:GeneralService) {
    super();
    this.userName = this.general.getUserName;
    this.userRole = this.general.UserRole;
    if(this.userName){
      this.userName = this.userName.split('@')[0];
      this.userName = this.userName.replace('.',' ')
    }
  }

  logout(){
    this.authService.logOut();   
  }
}
