import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    show: false
 };

export const ModalSlice = createSlice({
    name: 'Modal',
    initialState,
    reducers: {
        showModal(s) {
            s.show = true
        },
        hideModal(s) {
            s.show = false
        }
    }
});

export const { showModal, hideModal } = ModalSlice.actions;
