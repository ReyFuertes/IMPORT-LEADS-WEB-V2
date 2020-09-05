import { IUserProfile } from '../users/users.models';
import { IContract } from '../contracts/contract.model';
import { IAccess } from 'src/app/models/user.model';
// id?: string;
// username?: string;
// password?: string;
// salt?: string;
// user_profile?: IUserProfileDto;
// user_access?: IUserAccessDto[];
// user_role?: IUserRoleDto[]
export interface IUser {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  username?: string;
  password?: string;
  user_role?: IUserRole[];
  company?: string;
  phone?: string;
  user_access?: IUserAccess[]
}
export interface IUserRole {
  id?: string;
  user_role?: IRole;
  user?: IUser;
}
export interface IRole {
  id?: string;
  role_name?: string;
}
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
  user_access?: IUserAccess[] | any;
  user_role?: IRole[];
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

