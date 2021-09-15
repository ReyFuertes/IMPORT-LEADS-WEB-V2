import { createAction, props } from '@ngrx/store';

export interface INotification {
  success?: boolean;
  message: string;
  error?: boolean;
  info?: boolean;
  warning?: boolean;
}

export enum NotificationActionTypes {
  notificationSuccess = '[Notification] Success',
  removeNotification = '[Notification] Remove',
}
export const appNotificationAction = createAction(
  NotificationActionTypes.notificationSuccess,
  props<{ notification: INotification }>()
);
export const removeNotification = createAction(
  NotificationActionTypes.removeNotification,
);
