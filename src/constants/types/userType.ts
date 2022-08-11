type Account = {
  username: string;
  password: string;
};

export interface User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  avatar?: string;
  birthday?: Date | null;
  role?: string;
}
export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  avatar?: string;
  birthday?: Date | null;
}
export interface UserShort {
  firstName: string;
  lastName: string;
  avatar: string;
}
export type { Account as default };
