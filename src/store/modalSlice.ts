import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    isOpen: false,
    type: null, // This can be "delete" or "viewDetail"
    data: null, // This holds any data specific to the modal, like event details
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload.type;
      state.modal.data = action.payload.data;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.type = null;
      state.modal.data = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
