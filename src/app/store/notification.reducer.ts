import { appNotification } from './notification.action';
import { on } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { createReducer } from '@ngrx/store';

export interface NotificationState {
  success: boolean,
}
export const initialState = {
  success: false
};
const notificationReducer = createReducer(
  initialState,
  on(appNotification, (state, action) => {
    return ({ ...state, success: action.success })
  }),
);
export function NotificationReducer(state: NotificationState, action: Action) {
  return notificationReducer(state, action);
}
export const getNotification = (state: NotificationState) =>  state.success;
