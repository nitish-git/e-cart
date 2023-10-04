import { createSelector } from '@reduxjs/toolkit';
import { ModalSlice } from './reducer';

const modal$ = (s) => s[ModalSlice.name];

export const showModal$ = createSelector(modal$, (s) => s.show);
