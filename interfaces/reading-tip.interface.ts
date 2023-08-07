import { IAccount } from './account.interface';

export interface IReadingTip {
  _id: string;
  title?: string;
  content?: string;
  thumbnail?: string;
  creator?: string | IAccount;
}
