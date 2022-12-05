import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'uc-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<User> | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.getProfileFromCurrentUser();
  }
}
