import { IMiniTestHistory } from "./mini-test-history.interface";
import { Role } from "./role.enum";


export interface IAccount {
  _id: string;
  name: string;
  email: string;
  roles: Role[];
  avatar: string;
  createdAt?: string;
  updatedAt?: string;
  password?: string;
  miniTestHistory?: IMiniTestHistory[];
}