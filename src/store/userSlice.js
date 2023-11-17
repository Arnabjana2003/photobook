import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userList: []
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        getUser: (state,action)=>{
            state.userList = action.payload
        }
    }
})

export default userSlice.reducer
export const {getUser} = userSlice.actions