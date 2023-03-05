import { createSlice, current } from '@reduxjs/toolkit';

export interface IUser {
  token: string;
  User: Object;
  login: boolean;
  cart: Array<Object>;
}
const initialState: any = {
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
    //Thêm sản phẩm vào giỏ hàng
    addCart: (state, action) => {
      //Kiểm tra sản phẩm có tồn tại không
      const product = state.cart.find((item: any) => {
        if (item.product.Name === action.payload.product.Name)
          return {
            item,
          };
      });
      //Có thì thêm số lượng sản phẩm tương ứng trong giỏ hàng
      //Không có thì thêm sản phẩm vào giở hàng
      if (product) {
        product.quantity += action.payload.quantity;
        state.cart.forEach((item: any, index: any) => {
          if (item.product.Name === product.product.Name)
            state.cart[index] = product;
        });
      } else {
        state.cart.push(action.payload);
      }
    },
    //Giảm số lượng của một sản phẩm cụ thể trong giỏ hàng
    decrement: (state, action) => {
      const product = state.cart.find((item: any) => {
        if (item.product.Name === action.payload)
          return {
            item,
          };
      });
      //Có thì thêm số lượng sản phẩm tương ứng trong giỏ hàng
      //Không có thì thêm sản phẩm vào giở hàng
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
          state.cart.forEach((item: any, index: any) => {
            if (item.product.Name === product.product.Name)
              state.cart[index] = product;
          });
        }
      }
    },
    //Tăng số lượng của một sản phẩm cụ thể trong giỏ hàng
    increment: (state, action) => {
      const product = state.cart.find((item: any) => {
        if (item.product.Name === action.payload)
          return {
            item,
          };
      });
      //Có thì thêm số lượng sản phẩm tương ứng trong giỏ hàng
      //Không có thì thêm sản phẩm vào giở hàng
      if (product) {
        product.quantity += 1;
        state.cart.forEach((item: any, index: any) => {
          if (item.product.Name === product.product.Name)
            state.cart[index] = product;
        });
      }
    },
    //upate quantity
    //remove product form cart
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item: any) => {
        item.product.Name != action.payload;
      });
    },
  },
});

export const {
  setLogin,
  setLogout,
  addCart,
  decrement,
  removeItem,
  increment,
} = userSlice.actions;

export default userSlice.reducer;
