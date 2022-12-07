import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/uc-app/src/environments/environment';
import { catchError, Observable, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { CommentDto } from './comment.dto';
import { Comment } from './comment.model';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getAllCommentsFromProduct(productId: string): Observable<Comment[]> {
        return this.httpClient.get(environment.API_URL + 'product/' + productId + '/comments') as Observable<Comment[]>;
    }

    getCommentById(productId: string, commentId: string): Observable<Comment> {
        return this.httpClient.get(environment.API_URL + 'product/' + productId + '/comment/' + commentId) as Observable<Comment>;
    }

    createComment(productId: string, commentDto: CommentDto): Observable<Object> {
        return this.httpClient.post(environment.API_URL + 'product/' + productId + '/comment', 
        {
            title: commentDto.title,
            body: commentDto.body,
            rating: commentDto.rating,
        }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }).pipe(
            catchError((error: any) => {
                throw new Error(error.error.message);
            })
        ) as Observable<Object>
    }

    updateComment(productId: string, commentId: string, newComment: CommentDto): Observable<Object> {
        return this.httpClient.put(environment.API_URL + 'product/' + productId + '/comment/' + commentId, 
        {
            title: newComment?.title,
            body: newComment?.body,
            rating: newComment?.rating,
        }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }).pipe(
            catchError((error: any) => {
                throw new Error(error.error.message);
            })
        ) as Observable<Object>
    }

    deleteComment(productId: string, commentId: string): Observable<Object> {
        return this.httpClient.delete(environment.API_URL + 'product/' + productId + '/comment/' + commentId, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        }).pipe(
            catchError((error: any) => {
                throw new Error(error.error.message);
            })
        ) as Observable<Object>
    }
}
