import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-message',
  imports: [CommonModule, MaterialModule],
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss'],
})
export class DialogMessageComponent {
  title: string;
  navText: string;
  message: string;
  showCancel: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogMessageComponent>, // Inject dialog reference
  ) {
    this.title = data.title;
    this.message = data.message;
    this.navText = data.navText;
    this.showCancel = data.showCancel;
  }

  onNavigate(): void {
    // Close the dialog and notify the parent component if necessary
    this.dialogRef.close(); // Close the dialog
    // Optionally, you can trigger a retry or other actions here if needed
  }
}
