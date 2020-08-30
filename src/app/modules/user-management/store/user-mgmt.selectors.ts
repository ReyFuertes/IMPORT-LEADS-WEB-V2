import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { IUserMgmt, IUserTableData } from '../user-mgmt.model';
import * as _ from 'lodash';

export const selectedState = (state: AppState) => state.userMgmt;
export const getAllUsersSelector = createSelector(
  selectedState,
  state => {
    const fmtUsers = Object.values(state.entities);
    const users = fmtUsers.map((u: IUserMgmt) => {
      let ret: IUserTableData = _.merge(u, u.user_profile);
      ret = Object.assign({}, ret, { _id: u.id, name: u.user_profile.firstname + ' ' + u.user_profile.lastname });

      delete ret.user_profile;
      return ret;
    });
    return users;
  }
);
