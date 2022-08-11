import { Review } from './reviewType';

export interface ProgramType {
  id?: number;
  name?: string;
  total?: number;
  remain?: number;
  price?: number;
  starAvg?: number;
  startDate?: Date;
  endDate?: Date;
  avatar?: string;
  description?: string;
  imageQR?: string;
  reviews?: Review[];
}
