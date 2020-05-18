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
