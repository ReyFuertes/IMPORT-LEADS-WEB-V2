import { createAction, props } from '@ngrx/store';
import { IUserProfile } from '../../users.models';

export enum UserProfileActionTypes {
  loadUserProfileAction = '[User Profile] load',
  loadUserProfileSuccessAction = '[User Profile] load (success)',
  uploadProfileImageAction = '[User Profile] upload image',
  updateProfileAction = '[User Profile] update',
  updateProfileSuccessAction = '[User Profile] update (success)',
}
export const updateProfileAction = createAction(
  UserProfileActionTypes.updateProfileAction,
  props<{ payload: IUserProfile }>()
);
export const updateProfileSuccessAction = createAction(
  UserProfileActionTypes.updateProfileSuccessAction,
  props<{ response: IUserProfile }>()
);
export const uploadProfileImageAction = createAction(
  UserProfileActionTypes.uploadProfileImageAction,
  props<{ file: any }>()
);
export const loadUserProfileAction = createAction(
  UserProfileActionTypes.loadUserProfileAction,
  props<{ id: string }>()
);
export const loadUserProfileSuccessAction = createAction(
  UserProfileActionTypes.loadUserProfileSuccessAction,
  props<{ detail: IUserProfile }>()
);
