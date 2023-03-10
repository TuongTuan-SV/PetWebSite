import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IUser {
  token: string;
  User: Object;
  login: boolean;

  role: Number;
  createAccount: boolean;
}

const initialState: any = {
  token: '',
  User: {},
  login: false,

  role: 0,
  createAccount: false,
};
//ACTION

//UPDATE CART
export const updateCart = createAsyncThunk(
  'User/updateCart',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      console.log(state.User.User.cart);
      const response = await axios.patch(
        `/user/addcart`,
        { cart: state.User.User.cart },
        {
          headers: { Authorization: state.User.token },
        }
      );

      // Inferred return type: Promise<MyData>
      // console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//refreshToken
export const refreshToken = createAsyncThunk(
  'User/refreshToken',
  async (data, thunkAPI) => {
    try {
      // console.log('asdasdsad');
      const fristLoign = localStorage.getItem('firstLogin');
      if (fristLoign) {
        const res = await axios.get(`/user/refresh_token`);
        return res.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//GET USER INFO
export const getuser = createAsyncThunk(
  'User/getuser',
  async (token, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const res = await axios.get(`/user/info`, {
        headers: { Authorization: state.User.token },
      });
      console.log(res.data);
      // setIsLogged(true);
      // res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

      // setCart(res.data.cart);
      // console.log(res.data);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setLogin: (state) => {
      state.login = true;
    },
    setCreateAccount: (state) => {
      state.createAccount = !state.createAccount;
    },
    setCart: (state, action) => {
      const check = state.User.cart.every((item: any) => {
        return item._id != action.payload._id;
      });
      if (check) {
        const cart = [...state.User.cart, { ...action.payload, quantity: 1 }];
        state.User.cart = cart;
        console.log(state.User.cart);
      } else {
        alert('This product has been add to cart');
      }
    },
    setLogout: (state) => {
      state.User = {};
      state.login = false;
      state.token = '';
      console.log(state.User);
    },
    decrement: (state, action) => {
      const product = state.User.cart.find((item: any) => {
        if (item._id === action.payload)
          return {
            item,
          };
      });
      //Có thì thêm số lượng sản phẩm tương ứng trong giỏ hàng
      //Không có thì thêm sản phẩm vào giở hàng
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
          state.User.cart.forEach((item: any, index: any) => {
            if (item._id === product._id) state.cart[index] = product;
          });
        }
      }
    },
    //Tăng số lượng của một sản phẩm cụ thể trong giỏ hàng
    increment: (state, action) => {
      const product = state.User.cart.find((item: any) => {
        if (item._id === action.payload)
          return {
            item,
          };
      });
      //Có thì thêm số lượng sản phẩm tương ứng trong giỏ hàng
      //Không có thì thêm sản phẩm vào giở hàng
      if (product) {
        product.quantity += 1;
        state.User.cart.forEach((item: any, index: any) => {
          if (item._id === product._id) state.cart[index] = product;
        });
      }
    },
    //upate quantity
    //remove product form cart
    removeItem: (state, action) => {
      state.User.cart = state.User.cart.filter((item: any) => {
        if (item._id != action.payload) return item;
      });
      // console.log(product);
    },
  },
  extraReducers: (builder) => {
    //UPDATE CART
    builder
      .addCase(updateCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
      });
    //REFESH TOKEN
    builder
      .addCase(refreshToken.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accesstoken;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
      });
    //GET USER
    builder
      .addCase(getuser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getuser.fulfilled, (state, action) => {
        state.loading = false;
        state.User = action.payload;
        // state.cart = action.payload.cart;
      })
      .addCase(getuser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {
  setLogin,
  setLogout,
  decrement,
  removeItem,
  increment,
  setCart,
  setCreateAccount,
  // setToken,
} = userSlice.actions;

export default userSlice.reducer;
