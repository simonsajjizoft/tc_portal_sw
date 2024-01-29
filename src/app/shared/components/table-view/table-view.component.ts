import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output,  SimpleChange, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent {
  @Input() tasks;
  @Input() headding;
  @Input() type;
  @Input() actionButton;
  @Input() role;
  @Input() currentPage;
  @Input() totalItems;
  @Input() currentLimit;
  @Input() statusFilter;
  @Input() content;
  @Input() stationType;
  user: any;
  listHeader:any = [];
  fullPermission: boolean; 
  trigger: number = 0;
  subscription = new Subscription;
  checkLastProduct: boolean = false;
  @Output() updateLoader = new EventEmitter();
  @Output() assignToMe = new EventEmitter();
  @Output() navigation = new EventEmitter();
  @Output() taskSelect = new EventEmitter();
  @Output() smallDetail = new EventEmitter();
  @Output() assignTotal = new EventEmitter();
  @Output() actionClick = new EventEmitter();
  @Output() productClick = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() navigateEditPage = new EventEmitter();
  @Output() deleteEvent =  new EventEmitter();
  @Output() selectRowEvent = new EventEmitter();
  listKey: any[];
  userType: any;
  adminUser: boolean;
  assignToMeTotal:boolean ;
  station: string;
  multiAssign: boolean = false;
  mutiRoleAccess: boolean;
  selectedRow;
;

  ngOnChanges(changes: SimpleChange): void {
    this.listKey = [];
  
    this.listKey = (Object.keys(this.headding));
    const stationChange = changes['headding']
    this.listHeader = [];
    for(const list in this.headding){
      this.listHeader.push(this.headding[list])            
    }
  }

  navigateToEditPage(id){
    this.navigateEditPage.emit(id);
  }

  cl(item,action){
    if(action == 'edit') this.navigateToEditPage(item?.id);
    if(action == 'delete') this.deleteEvent.emit(item)
  }

  selectRow(row){
    this.selectedRow = row;
    this.selectRowEvent.emit(row);
  }

 

}
