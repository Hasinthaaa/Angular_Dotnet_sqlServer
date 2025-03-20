export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export interface IUserSignup extends IUser{
  confirmPassword?: string;
}
export interface LoggedUser extends IUser{
  token: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}
