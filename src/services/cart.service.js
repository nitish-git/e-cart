import { createAsyncThunk } from '@reduxjs/toolkit';
import { CART_URL, FETCH_CART } from '../constants';
import { doAsync } from './util/doAsync';

export const fetchCart = createAsyncThunk(
    'cart',
    async (thungArgs, thunkAPI) =>  await doAsync({
            url: CART_URL,
            loaderName: FETCH_CART,
            ...thungArgs,
            ...thunkAPI
        })
);

export const addToCart = createAsyncThunk(
    'addToCart',
    async (product, thungArgs, thunkAPI) =>
        await doAsync({
            url: CART_URL,
            method: 'post',
            body: product,
            ...thungArgs,
            ...thunkAPI
        }),
);

export const updateProductInCart = createAsyncThunk(
    'updateProductInCart',
    async ({ id, product }, thungArgs, thunkAPI) =>
        await doAsync({
            url: `${CART_URL}/${(id)}`,
            method: 'put',
            body: product,
            ...thungArgs,
            ...thunkAPI
        }),
);

export const removeFromCart = createAsyncThunk(
    'removeFromCart',
    async (productId, thunkArgs, thunkAPI) =>
        await doAsync({
            url: `${CART_URL}/${productId}`,
            method: 'delete',
            ...thunkArgs,
            ...thunkAPI
        }),
);
