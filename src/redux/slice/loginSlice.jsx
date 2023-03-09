/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  nick: '',
  isLogin: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId || state.userId;
      state.nick = action.payload.nick || state.nick;
      state.isLogin = action.payload.isLogin;
    },
  },
});

export const { login } = loginSlice.actions;

export default loginSlice.reducer;
