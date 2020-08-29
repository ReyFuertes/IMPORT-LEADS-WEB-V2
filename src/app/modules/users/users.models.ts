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
}

export interface User {
  id: number;
  name: string;
  firstname?: string;
  lastname?: string;
  position: string;
  role: UserRole;
  company: string;
  phone?: string;
  image?: string;
  access?: UserAccess[];
}

export interface UserAccess {
  id: number;
  title: string;
}

export interface UserRole {
  value: string | number;
  label: string;
}
