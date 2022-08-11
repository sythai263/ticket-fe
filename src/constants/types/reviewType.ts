import { UserShort } from './userType';

export interface Review {
  id?: number;
  user?: UserShort;
  star?: number;
  comment?: string;
  create?: Date;
}
