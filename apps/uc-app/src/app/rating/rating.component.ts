import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from './rating.model';
import { RatingService } from './rating.service';

@Component({
  selector: 'uc-app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  ratings$: Observable<Rating[]> | undefined;

  constructor(private ratingService: RatingService) {}

  ngOnInit(): void {
    this.ratings$ = this.ratingService.getRatings();
  }
}
