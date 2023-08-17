import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
interface userState{
    username:string,
    img_url?:string,

}

const initialState:userState = {
    username:'',
    img_url:''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userState>) => {
            return {
              ...state,
              ...action.payload,
            };
            
    }, clearUser: (state) => initialState,}

})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;