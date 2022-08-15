export interface InvoiceType {
  id?: number;
  amount?: number;
  currencyCode?: 'VND' | 'USD';
  bankCode?: string;
  bankTransNo?: string;
  cardType?: string;
  payDate?: Date;
  info?: string;
  isPaid?: boolean;
}
