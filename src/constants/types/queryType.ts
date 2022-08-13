export default interface QueryType {
  order?: 'ASC' | 'DESC';
  page?: number;
  take?: number;
  keyword?: string;
}
