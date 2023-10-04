import { createAsyncThunk } from "@reduxjs/toolkit";
import { FETCH_ORDERS, ORDERS_URL, PLACE_ORDERS } from "../constants";
import { doAsync } from "./util/doAsync";

export const fetchOrders = createAsyncThunk(
  "orders",
  async (thungArgs, thunkAPI) =>
    await doAsync({
      url: ORDERS_URL,
      loaderName: FETCH_ORDERS,
      ...thungArgs,
      ...thunkAPI,
    })
);

export const placeOrder = createAsyncThunk(
  "placeOrder",
  async (order, thungArgs, thunkAPI) =>
    await doAsync({
      url: ORDERS_URL,
      method: "post",
      loaderName: PLACE_ORDERS,
      body: order,
      ...thungArgs,
      ...thunkAPI,
    })
);
