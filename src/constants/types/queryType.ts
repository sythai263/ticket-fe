import { OrderType } from './OrderType';

export default interface QueryType {
  order?: OrderType;
  page?: number;
  take?: number;
  keyword?: string;
}
