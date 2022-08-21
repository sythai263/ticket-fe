export interface CreateUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  gender?: string;
  avatar?: string;
  birthday?: Date;
  password: string;
  rePassword: string;
}
