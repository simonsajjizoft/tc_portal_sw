import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {
  @Input() config;
  @Input() idx;
  options = false;
  // @HostBinding('style.width') public width: string ='50%';
  constructor() { }

  ngOnInit(): void {
    // if(this.config?.col == 12) this.width = '100%';
    // else if(this.config?.col == 6) this.width = '50%';
    // else this.width = '25%'; 
  }

  displayOptions(focus){
    this.options = focus;

  }

}
