import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';

@Component({
  selector: 'uc-app-comment-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class CommentProductComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription | undefined;
  deleteSubscription: Subscription | undefined;
  productId: string | null = null;
  comments$: Observable<Comment[]> | undefined;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router,  private commentService: CommentService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
      this.comments$ = this.commentService.getAllCommentsFromProduct(this.productId!);
    })
  }

  deleteComment(commentId: string): void {
    this.deleteSubscription = this.commentService.deleteComment(this.productId!, commentId).subscribe({
      next: () => this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; },
      error: (error) => this.error = error.message
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe;
    this.deleteSubscription?.unsubscribe;
  }
}
