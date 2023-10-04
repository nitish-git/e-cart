import { createSelector } from "@reduxjs/toolkit";
import {
  FETCH_CART,
  FETCH_ORDERS,
  FETCH_PRODUCTS,
  FETCH_SALES,
  FETCH_USERS,
  PLACE_ORDERS,
} from "../../constants";
import { LoaderSlice } from "./reducer";

const busyIndicatorState$ = (s) => s[LoaderSlice.name];

export const isProductLoading$ = createSelector(busyIndicatorState$, (s) =>
  Boolean(s[FETCH_PRODUCTS])
);

export const isSalesLoading$ = createSelector(busyIndicatorState$, (s) =>
  Boolean(s[FETCH_SALES])
);

export const isCartLoading$ = createSelector(busyIndicatorState$, (s) =>
  Boolean(s[FETCH_CART])
);

export const isUserLoading$ = createSelector(busyIndicatorState$, (s) =>
  Boolean(s[FETCH_USERS])
);

export const isOrdersLoading$ = createSelector(busyIndicatorState$, (s) =>
  Boolean(s[FETCH_ORDERS])
);

export const isPlacingOrder$ = createSelector(busyIndicatorState$, (s) =>
  Boolean(s[PLACE_ORDERS])
);
