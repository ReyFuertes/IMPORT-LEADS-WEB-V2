import { createAction, props } from '@ngrx/store';
import { IAccess } from 'src/app/models/user.model';

export enum AppActionTypes {
  initAppAction = '[App] init',
  initAppSuccessAction = '[App] init (success)',
  loadAccessAction = '[App] load user access',
  loadAccessSuccessAction = '[App] load user access (success)',
}
export const loadAccessAction = createAction(
  AppActionTypes.loadAccessAction,
);
export const loadAccessSuccessAction = createAction(
  AppActionTypes.loadAccessSuccessAction,
  props<{ response: IAccess[] }>()
);
export const initAppAction = createAction(
  AppActionTypes.initAppAction,
);
export const initAppSuccessAction = createAction(
  AppActionTypes.initAppSuccessAction,
  props<{ token: any }>()
);