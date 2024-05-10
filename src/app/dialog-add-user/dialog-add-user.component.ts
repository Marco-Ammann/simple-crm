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
import {MatSelectModule} from '@angular/material/select';



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

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  ngOnInit(): void {}


  /**
   * Konvertiert das manuelle Datum in ein `Date`-Objekt und prüft, ob es gültig ist.
   */
  parseBirthDate() {
    const parsedDate = new Date(this.birthDateInput);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }


  /**
   * Speichert den Benutzer in Firestore.
   */
  async saveUser() {
    const parsedDate = this.parseBirthDate();
    this.user.birthDate = parsedDate ? parsedDate.getTime() : 0;

    if (this.user.birthDate === 0) {
      console.error('Ungültiges Geburtsdatum eingegeben.');
      return;
    }

    this.loading = true;

    try {
      const newUserRef = doc(collection(this.firestore, 'users'));
      await setDoc(newUserRef, { ...this.user });
      console.log('User successfully added:', newUserRef.id);
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }
}
