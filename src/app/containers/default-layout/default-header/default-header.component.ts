import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  public userName;
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5);
  statusDropdown;
  @ViewChild('drpdown') drpdown:ElementRef;
  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    const clickedInside = this.drpdown.nativeElement.contains(target);
    if (!clickedInside) {
      this.statusDropdown = false;
    }
  }

  constructor(private classToggler: ClassToggleService,private authService :AuthService) {
    super();
    this.userName = sessionStorage.getItem('userName');
    if(this.userName) this.userName = this.userName.split('@')[0];
  }

  logout(){
    this.authService.logOut();   
  }
}
