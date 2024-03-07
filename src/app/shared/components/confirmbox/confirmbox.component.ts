import { CommonModule } from '@angular/common';
import { Component,Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from 'src/app/material/material.module';


@Component({
  selector: 'app-confirmbox',
  templateUrl: './confirmbox.component.html',
  styleUrls: ['./confirmbox.component.scss'],
})
export class ConfirmboxComponent {
  message: string = "";
  isAssigneeDropdown;
  isStatusDropdown;
  userList;
  statusList;
  menu;
  selectedAssignee;
  selectedStatus;
  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmboxComponent>,
    private tostr:ToastrService
    ) {
    if (data) {
      this.userList = data?.userList;
      console.log(data?.packageStatusId)
      this.statusList = data?.statusList;
      if(this.statusList){
        this.statusList?.map((item)=>{
          if(!data?.statusId && item?.statusId=='65cdb5ea5c7dba7637483539') this.selectStatus(item)
          else if(data?.statusId == item?.statusId) this.selectStatus(item)
        });
      }
      if(this.userList){
        this.userList.map((item)=>{
          if(data?.assignee === item) this.selectAssignee(item);
        });
      }
     
    }
  }

  ngOnInit(): void{ }

  okClick(): void {
    if(this.selectedAssignee && this.selectedStatus) this.dialogRef.close({assignee:this.selectedAssignee,status:this.selectedStatus});
    else this.tostr.warning("Please do fill in the Required Fields.");
  }

  cancelClick(): void {
    this.dialogRef.close(false);
  }

  selectStatus(status){
    this.statusList.map((item)=>{item.selected = false})
    status.selected = true;
    this.selectedStatus = status;
  }

  selectAssignee(assignee){
    this.selectedAssignee = assignee;
  }

}
