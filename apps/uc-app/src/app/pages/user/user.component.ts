import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Category } from '../category/category.model';
import { Comment } from '../comment/comment.model';
import { Product } from '../product/product.model';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'uc-app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  loggedInUser$: Observable<User | undefined> | undefined;
  routeSubscription: Subscription | undefined;
  userSubscription: Subscription | undefined;
  productsSubscription: Subscription | undefined;
  followSubscription: Subscription | undefined;
  unfollowSubscription: Subscription | undefined;
  followStatusSubscription: Subscription | undefined;
  followersSubscription: Subscription | undefined;
  commentsSubscription: Subscription | undefined;
  categoriesSubscription: Subscription | undefined;
  userId: string | null = null;
  user: User | undefined;
  products: Product[] | undefined;
  followers: User[][] | undefined;
  comments: Comment[] | undefined;
  categories: Category[] | undefined;
  status: boolean = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');

      this.userSubscription = this.userService.getProfileFromOtherUser(this.userId!).subscribe({
        next: (user) => {
          this.user = user;
          
          if (this.user?.role === 'brand') {
            this.productsSubscription = this.userService.getProductsFromBrand(this.userId!).subscribe({
              next: (products) => this.products = products,
              error: (error) => this.error = error.message
            });

            this.categoriesSubscription = this.userService.getAllCategoriesFromUser(this.userId!).subscribe({
              next: (categories) => this.categories = categories,
              error: (error) => this.error = error.message
            })
          }
        },
        error: (error) => this.error = error.message
      });

      this.commentsSubscription = this.userService.getAllCommentsFromUser(this.userId!).subscribe({
        next: (comments) => this.comments = comments,
        error: (error) => this.error = error.message
      })

      this.followersSubscription = this.userService.getFollowers(this.userId!).subscribe({
        next: (followers) => {
          this.followers = followers.map(f => f.following);
        },
        error: (error) => this.error = error.message
      })

      this.followStatusSubscription = this.userService.checkFollowStatus(this.userId!).subscribe({
        next: (status) => this.status = status,
        error: (error) => this.error = error.message
      });
    })
  }

  followUser(userId: string): void {
    this.followSubscription = this.userService.followUser(userId).subscribe({
      next: () => this.router.navigateByUrl('/reload').then(() => this.router.navigate(['/', 'user', userId])),
      error: (error) => this.error = error.message
    })
  }

  unfollowUser(userId: string): void {
    this.unfollowSubscription = this.userService.unfollowUser(userId).subscribe({
      next: () => this.router.navigateByUrl('/reload').then(() => this.router.navigate(['/', 'user', userId])),
      error: (error) => this.error = error.message
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe;
    this.userSubscription?.unsubscribe;
    this.productsSubscription?.unsubscribe;
    this.followSubscription?.unsubscribe;
    this.unfollowSubscription?.unsubscribe;
    this.followStatusSubscription?.unsubscribe;
    this.followersSubscription?.unsubscribe;
    this.commentsSubscription?.unsubscribe;
    this.categoriesSubscription?.unsubscribe;
  }
}
