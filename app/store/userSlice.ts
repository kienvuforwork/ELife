import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
interface userState{
    username:string,
    id:string,

}

const initialState:userState = {
    username:'',
    id:''
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state : userState, action: PayloadAction<userState>) => {
            return {
              ...state,
              ...action.payload,
            };
            
    }, clearUser: (state : userState) => initialState,}

})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;