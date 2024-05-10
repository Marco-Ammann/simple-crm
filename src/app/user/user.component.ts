import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
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
import { doc, setDoc } from "firebase/firestore";


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
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})


export class UserComponent implements OnInit {
  displayedColumns: string[] = ['title', 'firstName', 'lastName', 'email', 'birthDate', 'street', 'zipCode', 'city'];
  dataSource = new MatTableDataSource<User>();

  constructor(private firestore: Firestore, public dialog: MatDialog) {}

  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');
    const users$: Observable<User[]> = collectionData(usersCollection, { idField: 'id' }).pipe(
      map((rawData: DocumentData[]) => rawData.map(data => new User(data)))
    );

    users$.subscribe(users => {
      this.dataSource.data = users;
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Gibt die Daten der angeklickten Zeile im Console-Log aus.
   * @param user - Das angeklickte `User`-Objekt
   */
  logClick(user: User) {
    console.log('Geklickter Benutzer:', user);
  }
}
