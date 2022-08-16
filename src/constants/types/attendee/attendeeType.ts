import { InvoiceType } from '../invoice/invoiceType';
import { ProgramType } from '../program/programType';
import { UserShort } from '../user/userType';

export interface AttendeeType {
  id: number;
  user: UserShort;
  program: ProgramType;
  invoice: InvoiceType;
  imageQR: string;
  isCheckIn: boolean;
}
