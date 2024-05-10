import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doc, Firestore, docData } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: any = {};

  private paramMapSubscription!: Subscription;

  private userSubscription!: Subscription;


  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute
  ) { }


  /**
   * Initializes the component and starts listening to route parameters to fetch user data.
   */
  ngOnInit(): void {
    this.paramMapSubscription = this.route.paramMap.subscribe(paramMap => {
      const userId = paramMap.get('id');
      if (userId) {
        this.userSubscription = this.fetchUser(userId);
      }
    });
  }


  /**
   * Cleans up the active subscriptions when the component is destroyed.
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
   * @param userId - The unique identifier of the user in Firestore.
   * @returns {Subscription} The subscription object to manage the Firestore observable.
   */
  private fetchUser(userId: string): Subscription {
    const userRef = doc(this.firestore, `users/${userId}`);
    return docData(userRef).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          console.log('Fetched user:', this.user);
        } else {
          console.error('No user found with id:', userId);
        }
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }
}
