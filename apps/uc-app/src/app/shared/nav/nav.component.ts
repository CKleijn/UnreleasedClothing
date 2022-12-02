import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'uc-app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  loggedInUser$: Observable<User | undefined> | undefined;
  isMenuCollapsed = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['login']);
  }
}
