import { AppState } from './../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { loadTagsAction, addTag, loadTagsSuccess, addTagSuccess, deleteTag, deleteTagSuccess, updateTag, updateTagSuccess } from '../actions/tags.actions';
import { ITag } from './../../tags.model';
import { TagsService } from './../../tags.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class TagsEffect {
  updateTag$ = createEffect(() => this.actions$.pipe(
    ofType(updateTag),
    switchMap(({ item }) => this.tagsService.patch(item)
      .pipe(
        // reload all products since the child parent cost value cannot be updated via state update
        tap(() => this.store.dispatch(loadTagsAction({}))),
        map((updated: ITag) => {
          return updateTagSuccess({ updated });
        })
      ))
  ));

  deleteTag$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTag),
    switchMap(({ id }) => this.tagsService.delete(id)
      .pipe(
        map((deleted: ITag) => {
          return deleteTagSuccess({ deleted });
        })
      ))
  ));

  addTag$ = createEffect(() => this.actions$.pipe(
    ofType(addTag),
    switchMap(({ item }) => this.tagsService.post(item)
      .pipe(
        map((created: ITag) => {
          return addTagSuccess({ created });
        })
      ))
  ));

  loadTagsAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadTagsAction),
    switchMap(({ param }) => this.tagsService.getAll(param).pipe(
      map((items: ITag[]) => {
        return loadTagsSuccess({ items });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private tagsService: TagsService
  ) { }
}
