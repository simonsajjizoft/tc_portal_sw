import { Component, EventEmitter, Output,Input,SimpleChange } from '@angular/core';

@Component({
  selector: 'app-status-filter',
  templateUrl: './status-filter.component.html',
  styleUrls: ['./status-filter.component.scss'],
  host: {
    '(document:click)': '(onBodyClick($event))'
  }

})
export class StatusFilterComponent {
  @Input() clearStatusFilter:any;
  statusDropDown:boolean;
  selectedStatusType;
  statusList: any = [{ name: "Draft", value: 0,icon:'unpublish' }, { name: "Publish", value: 1 ,icon:'done'}];
  @Output() statusSelectEvent = new EventEmitter();

  constructor(){ }

  ngOnChanges(changes:SimpleChange){
    if(changes['clearStatusFilter'] ){
      if(this.clearStatusFilter == null){
        this.selectedStatusType = '';
        this.statusSelectEvent.emit(null);
      }
    }
  }

  onOptionSelected(status) {
    this.selectedStatusType = status;
    this.statusSelectEvent.emit(this.selectedStatusType?.name);
  }

  onBodyClick(event): void {
    if (event.target.classList[0] !== 'no-close' ) {
      this.statusDropDown = false;
    }
  }

}
