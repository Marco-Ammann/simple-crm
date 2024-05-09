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
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, setDoc } from "firebase/firestore";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';



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
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})


export class DialogAddUserComponent implements OnInit {

  user = new User();
  birthDate!: Date;
  loading!: boolean;

  users$: Observable<any[]>;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'id' });
  }

  ngOnInit(): void { }

  async saveUser() {
    this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
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
