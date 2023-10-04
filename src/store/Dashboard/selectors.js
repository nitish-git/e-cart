import { createSelector } from "@reduxjs/toolkit";
import { DashboardSlice } from "./reducer";

const dashboard$ = (s) => s[DashboardSlice.name];

export const products$ = createSelector(dashboard$, (s) => s.products);

export const productsForPagination$ = createSelector(
  dashboard$,
  (s) => s.productsForPagination
);

export const sales$ = createSelector(dashboard$, (s) => s.sales);

export const productsInCart$ = createSelector(dashboard$, (s) => s.cart);

export const orders$ = createSelector(dashboard$, (s) => s.orders);

export const viewedProducts$ = createSelector(
  dashboard$,
  (s) => s.viewedProducts
);

export const paginationFilters$ = createSelector(
  dashboard$,
  (s) => s.paginationFilters
);

export const filters$ = createSelector(dashboard$, (s) => s.filters);

export const countOfItems$ = createSelector(dashboard$, (s) => s.numberOfItems);

export const alert$ = createSelector(dashboard$, (s) => s.alert);

export const successMessage$ = createSelector(
  dashboard$,
  (s) => s.successMessage
);

export const itemToBeSearch$ = createSelector(
  dashboard$,
  (s) => s.itemToBeSearch
);

export const selectedModal$ = createSelector(
  dashboard$,
  (s) => s.selectedModal
);

export const itemToBeRemvoedFromCart$ = createSelector(
  dashboard$,
  (s) => s.itemToBeRemvoedFromCart
);

export const productToBePurchase$ = createSelector(
  dashboard$,
  (s) => s.productToBePurchase
);
