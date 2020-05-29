import { appNotification, INotification, removeNotification } from './notification.action';
import { on } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { createReducer } from '@ngrx/store';

export interface NotificationState {
  notification: INotification,
}
export const initialState = {
  notification: null
};
const notificationReducer = createReducer(
  initialState,
  on(removeNotification, (state) => {
    return Object.assign({ ...state, notification: null });
  }),
  on(appNotification, (state, action) => {
    return ({ ...state, notification: action.notification })
  }),
);
export function NotificationReducer(state: NotificationState, action: Action) {
  return notificationReducer(state, action);
}
export const getNotification = (state: NotificationState) => {
  return state.notification
};
