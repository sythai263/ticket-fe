import { InvoiceType } from '../invoice/invoiceType';
import { ProgramType } from '../program/programType';
import userType from '../user/userType';

export interface AttendeeType {
  id: number;
  user: userType;
  program: ProgramType;
  invoice: InvoiceType;
  imageQR: string;
  isCheckIn: boolean;
}
