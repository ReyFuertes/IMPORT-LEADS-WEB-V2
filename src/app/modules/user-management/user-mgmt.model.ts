import { IUserProfile } from '../users/users.models';
import { IContract } from '../contracts/contract.model';
import { IAccess, IUser } from 'src/app/models/user.model';
export interface IUserAccess {
  id?: string;
  user?: IUserMgmt;
  access?: IAccess
}
export interface IUserMgmt {
  id?: string;
  username?: string;
  user_profile?: IUserProfile
  password?: string;
  salt?: string;
  contract?: IContract;
  user_access?: IUserAccess[] | string[];
}
export interface IUserTableData {
  _id: string;
  id?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  wechatid?: string;
  qqid?: string;
  company_name?: string;
  company_linkedin?: string;
  company_address?: string;
  self_intro?: string;
  position?: string;
  image?: string;
  name?: string;
  user_profile?: IUserProfile;
  access?: IAccess[];
}

