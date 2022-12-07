import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../pages/user/user.model';

@Component({
  selector: 'uc-app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  userSubscription: Subscription | undefined;
  userId: string | undefined;
  loggedInUser: User | undefined;
  isMenuCollapsed = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe({
      next: (user) => {
        this.loggedInUser = user;
        this.userId = user?._id;
      }
    })
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe;
  }
}
