import { get } from '../utils/http';

export function fetchDetail(itemId) {
  return get(`/items/info/${itemId}`);
}
