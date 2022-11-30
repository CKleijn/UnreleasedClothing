import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rating } from './rating.model';

@Injectable({
    providedIn: 'root'
})
export class RatingService {
    constructor(private httpClient: HttpClient) { }

    getRatings(): Observable<Rating[]> {
        return this.httpClient.get(environment.API_URL + 'ratings') as Observable<Rating[]>;
    }
}
