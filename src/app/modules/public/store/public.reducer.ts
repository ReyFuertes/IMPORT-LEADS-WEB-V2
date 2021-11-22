import { createReducer, on, Action } from "@ngrx/store";
import { isUserExistForChangePasswordSuccessAction } from "./public.actions";

export interface PublicState {
  email: string
}
export const initialState: PublicState = {
  email: null
};
const publicReducer = createReducer(
  initialState,
  on(isUserExistForChangePasswordSuccessAction, (state, action) => {
    return Object.assign({}, state, { email: action.response });
  })
);
export function PublicReducer(state: PublicState, action: Action) {
  return publicReducer(state, action);
}