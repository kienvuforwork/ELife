  import { createSlice } from "@reduxjs/toolkit";
  import { PayloadAction } from "@reduxjs/toolkit";
  interface shareModalState {
    isOpen: boolean;
    isChosen: boolean
  }

  const initialState: shareModalState = {
    isOpen: false,
    isChosen:false
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
    setIsChosen: (state, action:PayloadAction<boolean> ) => {
      state.isChosen = action.payload
    }
    },
  });

  export const { onOpen, onClose,setIsChosen } = shareModalSlice.actions;
  export default shareModalSlice.reducer;
