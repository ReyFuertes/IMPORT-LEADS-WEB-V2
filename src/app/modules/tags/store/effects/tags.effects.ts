import { AppState } from './../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { loadTagsAction, addTagAction, loadTagsSuccessAction, addTagSuccessAction, deleteTagAction, deleteTagSuccessAction, updateTagAction, updateTagSuccessAction } from '../actions/tags.actions';
import { ITag } from './../../tags.model';
import { TagsService } from './../../tags.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class TagsEffect {
  updateTagAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateTagAction),
    switchMap(({ item }) => this.tagsService.patch(item)
      .pipe(
        // reload all products since the child parent cost value cannot be updated via state update
        tap(() => this.store.dispatch(loadTagsAction({}))),
        map((updated: ITag) => {
          return updateTagSuccessAction({ updated });
        })
      ))
  ));

  deleteTagAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTagAction),
    switchMap(({ id }) => this.tagsService.delete(id)
      .pipe(
        map((deleted: ITag) => {
          return deleteTagSuccessAction({ deleted });
        })
      ))
  ));

  addTagAction$ = createEffect(() => this.actions$.pipe(
    ofType(addTagAction),
    switchMap(({ item }) => this.tagsService.post(item)
      .pipe(
        map((created: ITag) => {
          return addTagSuccessAction({ created });
        })
      ))
  ));

  loadTagsAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadTagsAction),
    switchMap(({ param }) => this.tagsService.getAll(param).pipe(
      map((items: ITag[]) => {
        return loadTagsSuccessAction({ items });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private tagsService: TagsService
  ) { }
}
