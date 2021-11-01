import * as actions from '../constants/user';
import { initialState } from '../reducers/user';

export function signinAction(current) {
  return {
    type: actions.SIGNIN,
    payload: {
      isAuthenticated: true,
      current,
    },
  };
}

export function signoutAction() {
  return {
    type: actions.SIGNOUT,
    payload: initialState,
  };
}
