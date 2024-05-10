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
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent implements OnInit {
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
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firestore: Firestore
  ) {
    this.user = data.user;
    this.birthDateInput = new Date(this.user.birthDate);
  }

  async saveUserDetails() {
    this.loading = true;

    if (!this.user.id) {
      console.error('No user ID provided');
      this.loading = false;
      return;
    }

    const userRef = doc(this.firestore, `users/${this.user.id}`);

    try {
      await updateDoc(userRef, {
        title: this.user.title,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        birthDate: this.birthDateInput.getTime(),
      });

      this.dialogRef.close();
    } catch (error) {
      console.error('Error updating user details:', error);
    } finally {
      this.loading = false;
    }
  }
}
