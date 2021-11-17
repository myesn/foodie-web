import * as actions from '../constants/user';
import { initialState } from '../reducers/user';
import task from '../utils/task';

const signIn = (current) => ({
  type: actions.SIGNIN,
  payload: {
    isAuthenticated: true,
    current,
  },
});

const signOut = () => ({
  type: actions.SIGNOUT,
  payload: initialState,
});

export const signinAction =
  (values) =>
  async (dispatch, getState, { user }) => {
    const [data, error] = await task(user.signin(values));
    if (error) {
      return Promise.reject(error);
    }

    dispatch(signIn(data));
  };

export const signoutAction =
  (userId) =>
  async (dispatch, getState, { user }) => {
    const [, error] = await task(user.signout(userId));
    if (error) {
      return Promise.reject(error);
    }

    dispatch(signOut());
  };
