import { createSlice } from "@reduxjs/toolkit";

interface shareModalState {
  isOpen: boolean;
}

const initialState: shareModalState = {
  isOpen: false,
};

const shareModalSlice = createSlice({
  name: "shareModal",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onOpen, onClose } = shareModalSlice.actions;
export default shareModalSlice.reducer;
