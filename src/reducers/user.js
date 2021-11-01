import { SIGNIN, SIGNOUT } from '../constants/user';

export const initialState = {
  isAuthenticated: false,
  current: null,
};

const user = (user = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...action.payload,
      };
    case SIGNOUT:
      return {
        ...action.payload,
      };
    default:
      return user;
  }
};

export default user;
