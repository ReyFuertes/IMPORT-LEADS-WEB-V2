export enum AddEditState {
  'Add' = 1,
  'Edit' = 2
}
export interface AddEditDialogState {
  id?: string;
  formValues?: any;
  state?: AddEditState
}
export interface ISimpleItem {
  label: string;
  value?: string;
  _id?: string;
}
export interface Menu {
  label: string;
  value: string;
  icon?: string;
  action?: () => void;
}

export interface DropdownSelect {
  id: number;
  label: string;
  action?: () => void;
}
