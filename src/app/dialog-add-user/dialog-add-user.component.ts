import { Component, OnInit, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection } from '@angular/fire/firestore';
import { doc, setDoc } from "firebase/firestore";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})


export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDateInput = '';
  loading = false;

  titles = [
    { value: 'Mr.', viewValue: 'Mr.' },
    { value: 'Mrs.', viewValue: 'Mrs.' },
    { value: 'Ms.', viewValue: 'Ms.' },
    { value: 'Dr.', viewValue: 'Dr.' },
    { value: 'Prof.', viewValue: 'Prof.' },
    { value: 'Other', viewValue: 'Other' },
  ];

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  ngOnInit(): void { }


  /**
   * Saves the user in Firestore.
   */
  async saveUser() {
    this.loading = true;
    const isUserValid = this.validateUser();

    if (!isUserValid) {
      console.error('Invalid user data');
      this.loading = false;
      return;
    }

    try {
      await this.saveUserToFirestore();
      console.log('User successfully added:', this.user.id);
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }


  /**
   * Validates the user data, including the birth date.
   * Converts the manually entered birth date to a valid `Date` object.
   * @returns {boolean} `true` if the user data is valid, otherwise `false`.
   */
  validateUser(): boolean {
    const parsedDate = this.parseBirthDate();
    this.user.birthDate = parsedDate ? parsedDate.getTime() : 0;

    if (this.user.birthDate === 0) {
      console.error('Invalid birth date entered.');
      return false;
    }
    return true;
  }


  /**
   * Parses the manually entered birth date to a `Date` object and checks if it is valid.
   * @returns {Date | null} A valid `Date` object if the input is correct, otherwise `null`.
   */
  parseBirthDate(): Date | null {
    const parsedDate = new Date(this.birthDateInput);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }


  /**
   * Stores the current user in Firestore.
   * @returns {Promise<void>} A promise that resolves once the user is saved.
   */
  async saveUserToFirestore(): Promise<void> {
    const newUserRef = doc(collection(this.firestore, 'users'));
    this.user.id = newUserRef.id;

    await setDoc(newUserRef, { ...this.user });
  }

  
}
