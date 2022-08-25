import { Review } from '../review/reviewType';

export interface ProgramType {
  id?: number;
  name?: string;
  total?: number;
  remain?: number;
  price?: number;
  starAvg?: number;
  place?: string;
  startDate?: Date;
  endDate?: Date;
  avatar?: string;
  description?: string;
  imageQR?: string;
  allowCheckIn?: boolean;
  reviews?: Review[];
  isRegister?: boolean;
}
