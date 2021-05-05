export enum AddEditState {
  'Add' = 1,
  'Edit' = 2,
  'Import' = 3
}
export interface AddEditDialogState {
  id?: string;
  formValues?: any;
  state?: AddEditState
}
export interface ISimpleItem extends ISimpleAttribute {
  label?: string;
  value?: string;
}
export interface ISimpleAttribute {
  _id?: string;
  id?: string;
  parent?: ISimpleItem;
  children?: ISimpleItem[];
  user_route?: string;
  changed?: boolean
}
export interface Menu {
  label?: string;
  value?: any;
  icon?: string;
  action?: (menu: any) => void;
}

export interface IDropdownSelect {
  id: number;
  label: string;
  action?: () => void;
}
