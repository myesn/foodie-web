import { createSelector } from '@reduxjs/toolkit';

const user = (state) => state.user;
const current = (state) => state.user.current;

export const selectIsAuthenticated = createSelector(
  [user],
  (state) => state.isAuthenticated
);

export const selectAvatar = createSelector(
  [current],
  (current) => current.face
);

export const selectUser = createSelector(user);

export const selectNickName = createSelector(
  [current],
  (current) => current.nickname
);

export const selectUserId = createSelector([current], (current) => current.id);

// demo
export const selectTest = createSelector(
  [
    (state) => {
      console.log('1', state);
      return 1;
    },
    (state) => {
      console.log('2', state);
      return 2;
    },
    (state) => {
      console.log('3', state);
      return 3;
    },
    (state) => {
      console.log('4', state);
      return 4;
    },
    (state) => {
      console.log('5', state);
      return 5;
    },
    (state) => {
      console.log('6', state);
      return 6;
    },
  ],
  (a, b, c, d, e, f) => {
    console.log(a, b, c, d, e, f);
  }
);
