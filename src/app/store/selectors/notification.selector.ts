import { AppState } from 'src/app/store/app.reducer';
import { createSelector } from '@ngrx/store';
import * as fromNotification from '../reducers/notification.reducer';

export const selectedState = (state: AppState) => state.notification;
export const getSuccessSelector = createSelector(
  selectedState,
  fromNotification.getNotification
);
