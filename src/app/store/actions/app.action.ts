import { createAction, props } from '@ngrx/store';

export enum AppActionTypes {
  initAppAction = '[App] init',
  initAppSuccessAction = '[App] init (success)',
}
export const initAppAction = createAction(
  AppActionTypes.initAppAction,
);
export const initAppSuccessAction = createAction(
  AppActionTypes.initAppSuccessAction,
  props<{ token: any }>()
);