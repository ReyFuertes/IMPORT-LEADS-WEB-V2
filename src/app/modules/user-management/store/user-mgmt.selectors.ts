import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { IUserMgmt, IUserTableData, IRole } from '../user-mgmt.model';
import * as _ from 'lodash';

export const selectedState = (state: AppState) => state.userMgmt;
export const getCreatingUserSelector = createSelector(
  selectedState,
  state => state.creatingUser
);
export const getAllUsersSelector = createSelector(
  selectedState,
  state => {
    const fmtUsers = Object.values(state.entities);
    const users = fmtUsers.map((u: IUserMgmt) => {
      if (!u.user_profile) return;

      let ret: IUserTableData = Object.assign({}, {
        ...u.user_profile,
        ...u,
        _id: u.id,
        name: u.user_profile.firstname + ' ' + u.user_profile.lastname
      });
      delete ret.user_profile;
      return ret;
    });
    return users;
  }
);
