import { CommonModule } from '@angular/common';
import { Component,Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material/material.module';


@Component({
  selector: 'app-confirmbox',
  templateUrl: './confirmbox.component.html',
  styleUrls: ['./confirmbox.component.scss'],
})
export class ConfirmboxComponent {
  message: string = "";
  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmboxComponent>
    ) {
    if (data) {
      // this.visible = true;
      // this.message = data.message || this.message;
    }
  }

  ngOnInit(): void{ }

  okClick(): void {
    this.dialogRef.close(true);
  }

  cancelClick(): void {
    this.dialogRef.close(false);
  }

}
