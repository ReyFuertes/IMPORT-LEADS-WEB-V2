import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as _ from 'lodash';

export const selectedState = (state: AppState) => state.userView;
