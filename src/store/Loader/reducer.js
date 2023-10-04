import { createSlice } from "@reduxjs/toolkit";
import {
  FETCH_CART,
  FETCH_ORDERS,
  FETCH_PRODUCTS,
  FETCH_SALES,
  FETCH_USERS,
  PLACE_ORDERS,
} from "../../constants";

const initialState = {
  [FETCH_PRODUCTS]: 0,
  [FETCH_CART]: 0,
  [FETCH_SALES]: 0,
  [PLACE_ORDERS]: 0,
  [FETCH_USERS]: 0,
  [FETCH_ORDERS]: 0,
};

export const LoaderSlice = createSlice({
  name: "Loader",
  initialState,
  reducers: {
    increaseLoader(s, a) {
      if (a.payload) s[a.payload] = (s[a.payload] || 0) + 1;
      else s.global = (s.global || 0) + 1;
    },
    decreaseLoader(s, a) {
      if (a.payload) {
        const currentValue = s[a.payload];

        if (!currentValue) console.warn("Decremented an empty Loader");

        s[a.payload] = (currentValue || 1) - 1;
      } else s.global = (s.global || 1) - 1;
    },
  },
});

export const { increaseLoader, decreaseLoader } = LoaderSlice.actions;
