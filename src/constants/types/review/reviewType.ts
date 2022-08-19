import { UserShort } from '../user/userType';

export interface Review {
  id?: number;
  user?: UserShort;
  star?: number;
  comment?: string;
  createAt?: Date;
  canUpdate?: boolean;
}
