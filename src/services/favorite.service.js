import { createAsyncThunk } from '@reduxjs/toolkit';
import { PRODUCT_URL } from '../constants';
import { doAsync } from './util/doAsync';

export const markAndRemoveFavorite = createAsyncThunk(
    'markFavorite',
    async ({ id, product }, thungArgs, thunkAPI) =>
        await doAsync({
            url: `${PRODUCT_URL}/${id}`,
            method: 'put',
            body: product,
            ...thungArgs,
            ...thunkAPI
        }),
);
