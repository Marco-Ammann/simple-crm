import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {  MatSelectModule } from '@angular/material/select';
import { User } from '../../models/user.class';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent implements OnInit{
  loading = false;
  user!: User;
  birthDateInput: Date;

  titles = [
    { value: 'Mr.', viewValue: 'Mr.' },
    { value: 'Mrs.', viewValue: 'Mrs.' },
    { value: 'Ms.', viewValue: 'Ms.' },
    { value: 'Dr.', viewValue: 'Dr.' },
    { value: 'Prof.', viewValue: 'Prof.' },
    { value: 'Other', viewValue: 'Other' },
  ];

  ngOnInit(): void {}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    public dialogRef: MatDialogRef<DialogEditUserComponent>
  ) {
    this.user = data.user;
    this.birthDateInput = new Date(this.user.birthDate);
  }

  
  saveUserDetails() {}
}
