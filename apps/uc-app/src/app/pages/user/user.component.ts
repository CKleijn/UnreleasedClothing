import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'uc-app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription | undefined;
  followSubscription: Subscription | undefined;
  unfollowSubscription: Subscription | undefined;
  followStatusSubscription: Subscription | undefined;
  userId: string | null = null;
  user$: Observable<User> | undefined;
  status: boolean = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.user$ = this.userService.getProfileFromOtherUser(this.userId!);
      this.followStatusSubscription = this.userService.checkFollowStatus(this.userId!).subscribe({
        next: (status) => {
          this.status = status
        }
      });
    })
  }

  followUser(userId: string): void {
    this.followSubscription = this.userService.followUser(userId).subscribe({
      next: () => this.router.navigate(['profile']),
      error: (error) => this.error = error.message
    })
  }

  unfollowUser(userId: string): void {
    this.unfollowSubscription = this.userService.unfollowUser(userId).subscribe({
      next: () => this.router.navigate(['profile']),
      error: (error) => this.error = error.message
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe;
    this.followSubscription?.unsubscribe;
    this.unfollowSubscription?.unsubscribe;
    this.followStatusSubscription?.unsubscribe;
  }
}
