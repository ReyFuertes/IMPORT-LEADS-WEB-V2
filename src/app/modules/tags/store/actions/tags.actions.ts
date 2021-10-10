import { ITag } from './../../tags.model';
import { createAction, props } from '@ngrx/store';

export enum TagsActionTypes {
  deleteTagAction = '[Tags] Delete',
  deleteTagSuccessAction = '[Tags] Delete (success)',
  addTagAction = '[Tags] Add',
  addTagSuccessAction = '[Tags] Add (success)',
  loadTagsAction = '[Tags] Load',
  loadTagsSuccessAction = '[Tags] Load (success)',
  updateTagAction = '[Tags] Update',
  updateTagSuccessAction = '[Tags] Update (success)',
}
export const updateTagAction = createAction(
  TagsActionTypes.updateTagAction,
  props<{ item: ITag }>()
);
export const updateTagSuccessAction = createAction(
  TagsActionTypes.updateTagSuccessAction,
  props<{ updated: ITag }>()
);
export const deleteTagAction = createAction(
  TagsActionTypes.deleteTagAction,
  props<{ id: string }>()
);
export const deleteTagSuccessAction = createAction(
  TagsActionTypes.deleteTagSuccessAction,
  props<{ deleted: ITag }>()
);
export const addTagAction = createAction(
  TagsActionTypes.addTagAction,
  props<{ item: ITag }>()
);
export const addTagSuccessAction = createAction(
  TagsActionTypes.addTagSuccessAction,
  props<{ created: ITag }>()
);
export const loadTagsAction = createAction(
  TagsActionTypes.loadTagsAction,
  props<{ param?: string }>()
);
export const loadTagsSuccessAction = createAction(
  TagsActionTypes.loadTagsSuccessAction,
  props<{ items: ITag[] }>()
);
