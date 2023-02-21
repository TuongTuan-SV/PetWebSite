import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
  token: string;
  user: Object;
  cart: Array<object>;
}
const initialState: IUser = {
  token: '',
  user: {},
  cart: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //action == payload
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.accesstoken;
      console.log(state.user);
    },
    setLogout: (state) => {
      state.user = {};
      state.token = '';
      console.log(state.user);
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
