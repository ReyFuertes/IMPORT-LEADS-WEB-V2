import { createAction, props } from '@ngrx/store';

export interface INotification {
  success: boolean;
  message: string;
}

export enum NotificationActionTypes {
  notificationSuccess = '[Notification] Success',
  removeNotification = '[Notification] Remove',
}
export const appNotification = createAction(
  NotificationActionTypes.notificationSuccess,
  props<{ notification: INotification }>()
);
export const removeNotification = createAction(
  NotificationActionTypes.removeNotification,
);
