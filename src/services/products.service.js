import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_PRODUCTS, FETCH_VIEWED_PRODUCTS, PRODUCT_URL, VIEWED_PRODUCT_URL } from '../constants';
import { createFilterString } from './util/createFilterString';
import { doAsync } from './util/doAsync';

export const fetchProducts = createAsyncThunk(
    'products',
    async (filters = {}, thungArgs, thunkAPI) =>  {
        const filter = createFilterString(filters);
        const qs = filter ? `?${filter}` : '';

        return await doAsync({
            url: `${PRODUCT_URL}${qs}`,
            loaderName: FETCH_PRODUCTS,
            ...thungArgs,
            ...thunkAPI
        })
    }
);

export const fetchProductsForPagination = createAsyncThunk(
    'productsForPaginations',
    async (filters = {}, thungArgs, thunkAPI) =>  {
        const filter = createFilterString(filters);
        const qs = filter ? `?${filter}` : '';

        return await doAsync({
            url: `${PRODUCT_URL}${qs}`,
            ...thungArgs,
            ...thunkAPI
        })
    }
);

export const fetchViewedProducts = createAsyncThunk(
    'fetchViewedProducts',
    async (thungArgs, thunkAPI) =>  await doAsync({
            url: VIEWED_PRODUCT_URL,
            loaderName: FETCH_VIEWED_PRODUCTS,
            ...thungArgs,
            ...thunkAPI
        })
);

export const viewedProduct = createAsyncThunk(
    'viewedProduct',
    async (product, thungArgs, thunkAPI) =>
        await doAsync({
            url: VIEWED_PRODUCT_URL,
            method: 'post',
            body: product,
            ...thungArgs,
            ...thunkAPI
        }),
);
