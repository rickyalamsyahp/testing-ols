import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loginList: []
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    saveLogin: (state, action) => {
      state.loginList.push(action.payload)
    },
    deleteAllLogin: (state, action) => {
      state.loginList = [];
    },
  }
});

export const {
  saveLogin,
  deleteAllLogin
} = loginSlice.actions

export const selectLoginList = state => state.login.loginList

export default loginSlice.reducer