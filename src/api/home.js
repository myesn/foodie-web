import { get } from '../utils/http';

export function fetchCarousels(username) {
  return get('/home/carousel');
}
