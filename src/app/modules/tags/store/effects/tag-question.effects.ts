import { AppState } from './../../../contracts/store/reducers/index';
import { Store } from '@ngrx/store';
import { addTagQuestion, addTagQuestionSuccess, updateTagQuestion, updateTagQuestionSuccess, deleteTagQuestion, deleteTagQuestionSuccess } from './../actions/tag-question.action';
import { TagQuestionsService } from './../../services/tag-questions.service';
import { ITagQuestion } from './../../tags.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, take } from 'rxjs/operators';

@Injectable()
export class TagQuestionsEffects {
  deleteQuestion$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTagQuestion),
    mergeMap(({ id }) => this.tagsService.delete(id)
      .pipe(
        map((deleted: ITagQuestion) => {
          return deleteTagQuestionSuccess({ deleted });
        })
      ))
  ));

  addTagQuestion$ = createEffect(() => this.actions$.pipe(
    ofType(addTagQuestion),
    mergeMap(({ item }) => this.tagsService.post(item)
      .pipe(
        map((created: ITagQuestion) => {
          return addTagQuestionSuccess({ created });
        })
      ))
  ));

  updateTagQuestion$ = createEffect(() => this.actions$.pipe(
    ofType(updateTagQuestion),
    mergeMap(({ item }) => this.tagsService.post(item)
      .pipe(
        map((updated: ITagQuestion) => {
          return updateTagQuestionSuccess({ updated });
        })
      ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private tagsService: TagQuestionsService
  ) { }
}
