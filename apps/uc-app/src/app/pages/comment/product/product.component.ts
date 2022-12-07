import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../user/user.model';
import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';

@Component({
  selector: 'uc-app-comment-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class CommentProductComponent implements OnInit, OnDestroy {
  loggedInUser$: Observable<User | undefined> | undefined;
  routeSubscription: Subscription | undefined;
  commentsSubscription: Subscription | undefined;
  deleteSubscription: Subscription | undefined;
  productId: string | null = null;
  comments: Comment[] | undefined;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private commentService: CommentService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      this.commentsSubscription = this.commentService.getAllCommentsFromProduct(this.productId!).subscribe({
        next: (comments) => this.comments = comments,
        error: (error) => this.error = error.message
      })
    })
  }

  deleteComment(commentId: string): void {
    this.deleteSubscription = this.commentService.deleteComment(this.productId!, commentId).subscribe({
      next: () => this.router.navigateByUrl('/reload').then(() => this.router.navigate(['/', 'products', this.productId])),
      error: (error) => this.error = error.message
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe;
    this.commentsSubscription?.unsubscribe;
    this.deleteSubscription?.unsubscribe;
  }
}
