import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
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


export class UserComponent implements OnInit {

  /** Columns displayed in the user table. */
  displayedColumns: string[] = ['title', 'firstName', 'lastName', 'email', 'birthDate', 'street', 'zipCode', 'city'];

  /** Data source for the user table. */
  dataSource = new MatTableDataSource<User>();


  constructor(private firestore: Firestore, public dialog: MatDialog) { }


  /**
   * Initializes the component, loads the user data from Firestore, and sets it to the data source.
   */
  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');
    const users$: Observable<User[]> = collectionData(usersCollection, { idField: 'id' }).pipe(
      map((rawData: DocumentData[]) => rawData.map(data => new User(data)))
    );

    users$.subscribe(users => {
      this.dataSource.data = users;
    });
  }


  /**
   * Opens the dialog to add a new user.
   */
  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }


  /**
   * Applies a filter to the user table based on the input event.
   * @param {Event} event - The event object containing the filter input.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  /**
   * Logs the clicked user's data to the console.
   * @param {User} user - The clicked user object.
   */
  logClick(user: User) {
    console.log('Clicked user:', user);
  }
  
}
