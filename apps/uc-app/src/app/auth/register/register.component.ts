import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../login/login.dto';
import { RegisterUserDto } from './register.dto';

@Component({
  selector: 'uc-app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  registerUserDto: RegisterUserDto | undefined;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerUserDto = new RegisterUserDto();
  }

  onSubmit(): void {
    this.subscription = this.authService.registerUser(this.registerUserDto!).subscribe({
      next: (registerUser) => {
        if (registerUser) {
          this.authService.userDtoFromRegister = new LoginUserDto(this.registerUserDto?.emailAddress, this.registerUserDto?.password);
          this.router.navigate(['login']);
        }
      },
      error: (error) => this.error = error.message
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
