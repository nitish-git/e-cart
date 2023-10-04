import { createSelector } from "@reduxjs/toolkit";
import { UsersSlice } from "./reducer";

const users$ = (s) => s[UsersSlice.name];

export const allUsers$ = createSelector(users$, (s) => s.users);

export const user$ = createSelector(users$, (s) => s.user);
