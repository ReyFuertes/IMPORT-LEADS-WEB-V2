import { ITagQuestion } from './../../tags.model';
import { createAction, props } from '@ngrx/store';

export enum TagQuestionsActionTypes {
  deleteTagQuestion = '[Tag Questions] Delete',
  deleteTagQuestionSuccess = '[Tag Questions] Delete (success)',
  addTagQuestion = '[Tag Questions] Add',
  addTagQuestionSuccess = '[Tag Questions] Add (success)',
  updateTagQuestion = '[Tag Questions] Update',
  updateTagQuestionSuccess = '[Tag Questions] Update (success)',
}
export const updateTagQuestion = createAction(
  TagQuestionsActionTypes.updateTagQuestion,
  props<{ item: ITagQuestion }>()
);
export const updateTagQuestionSuccess = createAction(
  TagQuestionsActionTypes.updateTagQuestionSuccess,
  props<{ updated: ITagQuestion }>()
);
export const deleteTagQuestion = createAction(
  TagQuestionsActionTypes.deleteTagQuestion,
  props<{ id: string }>()
);
export const deleteTagQuestionSuccess = createAction(
  TagQuestionsActionTypes.deleteTagQuestionSuccess,
  props<{ deleted: ITagQuestion }>()
);
export const addTagQuestion = createAction(
  TagQuestionsActionTypes.addTagQuestion,
  props<{ item: ITagQuestion }>()
);
export const addTagQuestionSuccess = createAction(
  TagQuestionsActionTypes.addTagQuestionSuccess,
  props<{ created: ITagQuestion }>()
);
