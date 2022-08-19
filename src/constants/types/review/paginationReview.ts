import Meta from '../Meta';
import { Review } from './reviewType';

export interface PaginationReview {
  meta: Meta;
  data: Review[];
}
