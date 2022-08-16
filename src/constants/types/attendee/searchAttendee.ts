export default interface QueryAttendee {
  order?: 'ASC' | 'DESC';
  page?: number;
  take?: number;
  keyword?: string;
  username?: string;
  paid?: 'Paid' | 'Pending';
}
