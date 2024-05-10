import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doc, Firestore, docData } from '@angular/fire/firestore';
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
  @ViewChild('adressMenu')
  menuTrigger!: MatMenuTrigger;

  user: User = new User();

  private paramMapSubscription!: Subscription;
  private userSubscription!: Subscription;

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  /**
   * Initializes the component and starts listening to route parameters to fetch user data.
   * This method subscribes to the route parameters to determine the user ID and fetches the user details accordingly.
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
   * Cleans up active subscriptions when the component is destroyed.
   * This is important to prevent memory leaks due to active subscriptions after the component has been removed.
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
   * Fetches the user data from Firestore based on the user ID.
   * It listens to changes in the specified document to update the `user` property.
   * @param userId - The unique identifier of the user in Firestore.
   * @returns {Subscription} The subscription object to manage the Firestore observable.
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

  editMenu() {
    const dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user = this.user;
  }

  editUserDetail() {
    this.dialog.open(DialogEditUserComponent);
  }
}
