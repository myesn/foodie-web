import { get, post } from '../utils/http';

export function checkUsername(username) {
  return get('/passport/check-username', { username });
}

export function signup(data) {
  return post('/passport/signup', data);
}

export function signin(data) {
  return post('/passport/signin', data);
}
