import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromTags from '../reducers/tags.reducer'

export const selectedState = (state: AppState) => state.tags;
export const getTagsSelector = createSelector(
  selectedState,
  fromTags.getTags
);
