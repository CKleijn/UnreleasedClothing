import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription, Observable, switchMap, of } from 'rxjs';
import { ProductService } from '../../product/product.service';
import { Rating } from '../../rating/rating.model';
import { RatingService } from '../../rating/rating.service';
import { CommentDto } from '../comment.dto';
import { CommentService } from '../comment.service';

@Component({
  selector: 'uc-app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  paramSubscription: Subscription | undefined;
  createSubscription: Subscription | undefined;
  updateSubscription: Subscription | undefined;
  productId: string | null = null;
  commentId: string | null = null;
  comment = new CommentDto();
  error: string | null = null;
  commentExists: boolean = false;
  ratings$: Observable<Rating[]> | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private ratingService: RatingService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.productId = params.get('productId');
          this.commentId = params.get('commentId');

          if (this.productId && this.commentId) {
            this.commentExists = true;
            return this.commentService.getCommentById(this.productId, this.commentId);
          } else {
            return of(new CommentDto());
          }
        })
      ).subscribe((comment) => {
        this.comment = {
          ...comment
        }
      })

    this.ratings$ = this.ratingService.getRatings();
  }

  onSubmit(): void {
    if (this.commentExists) {
      this.updateSubscription = this.commentService.updateComment(this.productId!, this.commentId!, this.comment).subscribe({
        next: () => this.router.navigate([`products/${this.productId}`]),
        error: (error) => this.error = error.message
      })
    }
    else {
      this.createSubscription = this.commentService.createComment(this.productId!, this.comment).subscribe({
        next: () => this.router.navigate([`products/${this.productId}`]),
        error: (error) => this.error = error.message
      })
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe;
    this.createSubscription?.unsubscribe;
    this.updateSubscription?.unsubscribe;
  }
}
