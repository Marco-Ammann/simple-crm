import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-adress',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatSelectModule,
    MatFormField,
    MatProgressBarModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
  ],
  templateUrl: './dialog-edit-adress.component.html',
  styleUrl: './dialog-edit-adress.component.scss',
})
export class DialogEditAdressComponent implements OnInit {
  loading = false;
  user!: User;

  constructor(public dialogRef: MatDialogRef<DialogEditAdressComponent>, private firestore: Firestore) {}

  ngOnInit(): void {}

  async saveAddress() {
    this.loading = true;

    if (!this.user.id) {
      console.error('No user ID provided');
      this.loading = false;
      return;
    }

    const userRef = doc(this.firestore, `users/${this.user.id}`);
    try {
      await updateDoc(userRef, {
        street: this.user.street,
        zipCode: this.user.zipCode,
        city: this.user.city
      });
      this.dialogRef.close();
    } catch (error) {
      console.error('Error updating address:', error);
    } finally {
      this.loading = false;
    }
  }
}
