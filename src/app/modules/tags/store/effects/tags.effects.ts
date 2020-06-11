import { AppState } from './../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { loadTags, addTag, loadTagsSuccess, addTagSuccess, deleteTag, deleteTagSuccess, updateTag, updateTagSuccess } from '../actions/tags.actions';
import { ITag } from './../../tags.model';
import { TagsService } from './../../tags.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class TagsEffect {
  updateTag$ = createEffect(() => this.actions$.pipe(
    ofType(updateTag),
    mergeMap(({ item }) => this.tagsService.patch(item)
      .pipe(
        // reload all products since the child parent cost value cannot be updated via state update
        tap(() => this.store.dispatch(loadTags())),
        map((updated: ITag) => {
          return updateTagSuccess({ updated });
        })
      ))
  ));

  deleteTag$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTag),
    mergeMap(({ id }) => this.tagsService.delete(id)
      .pipe(
        map((deleted: ITag) => {
          return deleteTagSuccess({ deleted });
        })
      ))
  ));

  addTag$ = createEffect(() => this.actions$.pipe(
    ofType(addTag),
    mergeMap(({ item }) => this.tagsService.post(item)
      .pipe(
        map((created: ITag) => {
          return addTagSuccess({ created });
        })
      ))
  ));

  loadTags$ = createEffect(() => this.actions$.pipe(
    ofType(loadTags),
    mergeMap(() => this.tagsService.getAll().pipe(
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
