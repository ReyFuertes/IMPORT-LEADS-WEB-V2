import { createAction, props } from '@ngrx/store';

export enum NotificationActionTypes {
  Success = '[Notification] Success',
}
export const appNotification = createAction(
  NotificationActionTypes.Success,
  props<{ success: boolean }>()
);

