import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
  token: string;
  User: Object;
  login: boolean;
  cart: Array<object>;
}
const initialState: IUser = {
  token: '',
  User: {},
  login: false,
  cart: [],
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    //action == payload
    setLogin: (state, action) => {
      state.User = action.payload.user;
      state.token = action.payload.accesstoken;
      state.login = true;
      console.log(state.User);
    },
    setLogout: (state) => {
      state.User = {};
      state.login = false;
      state.token = '';
      console.log(state.User);
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
