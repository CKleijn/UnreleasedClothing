import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoginUserDto } from './login.dto';

@Component({
  selector: 'uc-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  userDto: LoginUserDto | undefined;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(!this.authService.userDtoFromRegister) {
      this.userDto = new LoginUserDto();
    } else {
      this.userDto = this.authService.userDtoFromRegister;
    }
  }

  onSubmit(): void {
    this.subscription = this.authService.signUserIn(this.userDto!).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['/']);
        }
      },
      error: (error) => this.error = error.message
    })
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
