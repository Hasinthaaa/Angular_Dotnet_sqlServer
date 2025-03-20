import { Component } from '@angular/core';
import { IUserCredentials, LoggedUser } from '../user.model'; // Updated import
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'bot-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  credentials: IUserCredentials = { email: '', password: '' };
  signInError: boolean = false;


  constructor(private userService: UserService, private router: Router) { }

  signIn() {
    this.signInError = false;
    this.userService.signIn(this.credentials).subscribe({
      next: (user: LoggedUser) => {
        localStorage.setItem('token', user.token); // Store the token in local storage
        this.router.navigate(['/catalog']);
      },
      error: () => (this.signInError = true)
    });
  }
}
