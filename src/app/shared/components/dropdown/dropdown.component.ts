import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() config;
  @Input() message:string="";
  @Input() idx;
  @HostBinding('style.width') public width: string ='50%';
  selectedValue;
  constructor() { }

  ngOnInit(): void {
    if(this.config?.col == 12) this.width = '100%';
    else if(this.config?.col == 6) this.width = '50%';
    else this.width = '25%'; 
  }

}
