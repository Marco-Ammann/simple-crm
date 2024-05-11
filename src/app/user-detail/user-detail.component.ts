import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, Firestore, docData, deleteDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.class';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})

export class UserDetailComponent implements OnInit, OnDestroy {
  menuTrigger!: MatMenuTrigger;
  user: User = new User();
  private paramMapSubscription!: Subscription;
  private userSubscription!: Subscription;

  /**
   * Constructor for UserDetailComponent
   * @param {Firestore} firestore - Firestore service for database operations
   * @param {ActivatedRoute} route - Angular ActivatedRoute for retrieving route parameters
   * @param {MatDialog} dialog - Material Dialog service for modals
   * @param {Router} router - Angular Router service for navigation
   */
  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}


  /**
   * Initializes the component, subscribing to route parameters to fetch user data
   * and update the user details.
   */
  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe((paramMap) => {
      const userId = paramMap.get('id');
      if (userId) {
        this.userSubscription = this.fetchUser(userId);
      }
    });
  }


  /**
   * Cleans up active subscriptions when the component is destroyed to prevent memory leaks.
   */
  ngOnDestroy(): void {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


  /**
   * Fetches the user data from Firestore based on the given user ID.
   * Updates the `user` property and listens to further changes.
   * @param {string} userId - The unique identifier of the user in Firestore
   * @returns {Subscription} The subscription object managing the Firestore observable
   */
  private fetchUser(userId: string): Subscription {
    const userRef = doc(this.firestore, `users/${userId}`);
    return docData(userRef).subscribe({
      next: (user) => {
        if (user) {
          this.user = new User(user as Partial<User>);
        } else {
          this.user = new User();
        }
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      },
    });
  }


  /**
   * Opens the dialog for editing the user's address information.
   */
  editMenu(): void {
    const dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user = new User(this.user);
  }


  /**
   * Opens the dialog for editing the user details.
   */
  editUserDetail(): void {
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      data: { user: new User(this.user) },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  

  /**
   * Deletes the user from Firestore and navigates back to the user overview.
   */
  deleteUser(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      const userRef = doc(this.firestore, `users/${userId}`);
      deleteDoc(userRef)
        .then(() => {
          console.log('User successfully deleted!');
          this.router.navigate(['/user/']);
        })
        .catch((error) => {
          console.error('Error removing user:', error);
        });
    }
  }
}
