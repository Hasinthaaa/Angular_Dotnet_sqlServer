import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { IUser, IUserCredentials, IUserSignup, LoggedUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: BehaviorSubject<IUser | null>;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<IUser | null>(null);
  }

  getUser(): Observable<IUser | null> {
    return this.user;
  }

  // signIn(credentials: IUserCredentials): Observable<IUser> {
  //   return this.http
  //     .post<IUser>('/api/user/SignIn', credentials)
  //     .pipe(map((user: IUser) => {
  //       this.user.next(user);
  //       return user;
  //     }));
  // }


  signIn(credentials: IUserCredentials): Observable<LoggedUser> {
    return this.http
      .post<LoggedUser>('/api/user/SignIn', credentials) 
      .pipe(
        map((user: LoggedUser) => {
          this.user.next(user); 
          return user;
        })
      );
  }



  signUp(userDetails: IUserSignup): Observable<IUser> {
    return this.http
      .post<IUser>('/api/user/SignUp', userDetails)
      .pipe(map((user: IUser) => {
        this.user.next(user);
        return user;
      }));
  }

  signOut() {
    this.user.next(null);
  }
}
