import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

import { Firestore, collection, collectionData, DocumentData } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  /**
   * Columns displayed in the user table.
   */
  displayedColumns: string[] = [
    'title',
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'street',
    'zipCode',
    'city',
  ];


  userTableData = new MatTableDataSource<User>();

  private usersSubscription!: Subscription;

  constructor(private firestore: Firestore, public dialog: MatDialog) { }


  /**
   * Initializes the component, loads the user data from Firestore, and assigns it to the data source.
   */
  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');
    const users$: Observable<User[]> = collectionData(usersCollection, { idField: 'id' }).pipe(
      map((rawData: DocumentData[]) => rawData.map((data) => new User(data)))
    );

    this.usersSubscription = users$.subscribe((users) => {
      this.userTableData.data = users;
    });
  }


  /**
   * Cleans up subscriptions when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }


  /**
   * Opens the dialog to add a new user.
   */
  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }


  /**
   * Applies a filter to the user table based on the input event.
   * @param event - The event object containing the filter input.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userTableData.filter = filterValue.trim().toLowerCase();
  }

}
