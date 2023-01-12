import { createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        accountdetails: null,
        chatList: null,
        chatUser: null,
    },
    reducers: {
        register: (state, action) => {
            state.accountdetails = action.payload;
        },
        post: (state, action) => {
            state.chatList = action.payload;
        },
        setChatUser: (state, action) => {
            state.chatUser = action.payload;
        },
    }
})

export const { register, post, setChatUser } = accountSlice.actions

export default accountSlice.reducer