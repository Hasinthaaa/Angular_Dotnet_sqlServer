import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserSignup } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'bot-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  userDetails: IUserSignup = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  signUpError:boolean = false;


constructor(private userService: UserService, private router: Router) { }

  signUp() {
    this.signUpError = false;
    this.userService.signUp(this.userDetails).subscribe({
      next: () => this.router.navigate(['/sign-in']),
      error: () => (this.signUpError = true)
    });

  }

}
