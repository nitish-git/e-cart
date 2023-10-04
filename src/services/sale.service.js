import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_SALES, SALES_URL } from '../constants';
import { doAsync } from './util/doAsync';

export const fetchSales = createAsyncThunk(
    'sales',
    async (thungArgs, thunkAPI) =>  await doAsync({
            url: SALES_URL,
            loaderName: FETCH_SALES,
            ...thungArgs,
            ...thunkAPI
        })
);
