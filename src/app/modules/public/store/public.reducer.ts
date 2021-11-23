import { createReducer, on, Action } from "@ngrx/store";
import { isUserExistForChangePasswordSuccessAction } from "./public.actions";

export interface PublicState {
  emailToken?: { email: string, token: string }
}
export const initialState: PublicState = {
  emailToken: null
};
const publicReducer = createReducer(
  initialState,
  on(isUserExistForChangePasswordSuccessAction, (state, action) => {
    return Object.assign({}, state, { emailToken: action.response });
  })
);
export function PublicReducer(state: PublicState, action: Action) {
  return publicReducer(state, action);
}