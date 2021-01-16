import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { IUserMgmt, IUserTableData, IRole, IUserAccess } from '../user-mgmt.model';
import * as _ from 'lodash';

export const selectedState = (state: AppState) => state.userMgmt;
export const getAllSimpleUsersSelector = createSelector(
  selectedState,
  state => {
    const ret = Object.values(state?.entities).map(u => {
      let label: string = '';
      if (u?.user_profile?.firstname && u?.user_profile?.firstname) {
        label = `${u?.user_profile?.firstname} ${u?.user_profile?.lastname}`;
      } else {
        label = u?.username;
      }
      return {
        label,
        value: u.id
      };
    })
    return ret;
  }
);
export const getUserByIdSelector = (id: string) => createSelector(
  selectedState,
  state => state.entities[id]
);
export const getCreatingUserSelector = createSelector(
  selectedState,
  state => state.creatingUser
);
export const getTableUsersSelector = createSelector(
  selectedState,
  state => {
    const fmtUsers = Object.values(state.entities) || [];
    const users = fmtUsers.map((u: IUserMgmt) => {
      //if (!u.user_profile) return;
      let ret: IUserTableData = Object.assign({}, {
        ...u?.user_profile,
        ...u,
        _id: u.id,
        name: u?.user_profile?.firstname + ' ' + u?.user_profile?.lastname
      });
      delete ret?.user_profile;
      return ret;
    });
    return users;
  }
);
