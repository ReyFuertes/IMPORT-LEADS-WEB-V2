import { createReducer, on, Action } from "@ngrx/store";
import { ChangePublicUserPasswordSuccessAction, isUserExistForChangePasswordSuccessAction } from "./public.actions";

export interface PublicState {
  emailToken?: { email: string, token: string, website_url: string };
  isPasswordChanged?: boolean;
}
export const initialState: PublicState = {
  emailToken: null,
  isPasswordChanged: null
};
const publicReducer = createReducer(
  initialState,
  on(ChangePublicUserPasswordSuccessAction, (state, action) => {
    return Object.assign({}, state, { isPasswordChanged: true });
  }),
  on(isUserExistForChangePasswordSuccessAction, (state, action) => {
    return Object.assign({}, state, { emailToken: action.response });
  })
);
export function PublicReducer(state: PublicState, action: Action) {
  return publicReducer(state, action);
}