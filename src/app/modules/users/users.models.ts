import { IContract } from "../contracts/contract.model";
import { IUser, IUserAccess, IUserRole } from "../user-management/user-mgmt.model";

export interface IUserSettingsContractResponse {
  id?: string;
  contract?: IContract[];
}

export interface IUserProfileResponse extends IUserProfile {
  user: IUser;
  user_access: IUserAccess[];
  user_role: IUserRole[]

}
export interface IUserProfile {
  id?: string;
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
  language?: string;
  name?: string;
  user?: IUser;
}

export interface User {
  id: number;
  name: string;
  firstname?: string;
  lastname?: string;
  position: string;
  company: string;
  phone?: string;
  image?: string;
  roles: UserRole[];
  access?: UserAccess[];
}

export interface UserAccess {
  id: number;
  title: string;
}

export interface UserRole {
  value: any;
  label: string;
}
