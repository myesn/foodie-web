import { get } from '../utils/http';

export function fetchCarousels(username) {
  return get('/home/carousel');
}

export function fetchRootCategories() {
  return get('/home/category');
}

export function fetchSubCategories(rootCategoryId) {
  return get(`/home/category/${rootCategoryId}`);
}

export function fetchCategorySixItems(rootCategoryId) {
  return get(`/home/category/six-items/${rootCategoryId}`);
}
