import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface INewOrder {
  FirstName: string;
  LastName: string;
  Address: string;
  Country: string;
  City: string;
  PostalCode: string;
  Cart: Array<[object]>;
  PaymentMethod: number;
  Total: number;
}
export interface IOrder {
  order: INewOrder;
  loading: boolean;
  OrderStatus: boolean;
  msg: string;
}
const OrderinitialState: INewOrder = {
  FirstName: '',
  LastName: '',
  Address: '',
  Country: '',
  City: '',
  PostalCode: '',
  Cart: [],
  PaymentMethod: 0,
  Total: 0,
};

const initialState: IOrder = {
  order: OrderinitialState,
  loading: false,
  msg: '',
  OrderStatus: false,
};
export const CreateOrder = createAsyncThunk(
  'Order/CreateOrder',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();

      if (state.User.User.cart.length > 0) {
        const response = await axios.post(
          '/api/order',
          { order: state.Order.order },
          {
            headers: { Authorization: state.User.token },
          }
        );
        return response.data;
      } else alert('Cart is Empty');

      // // Inferred return type: Promise<MyData>
      // // console.log(response.data);
    } catch (err: any) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);

export const OrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrderCart: (state, action) => {
      const cart = [...action.payload];
      state.order.Cart = cart;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateOrder.pending, (state, action) => {
      state.loading = true;
      state.msg = '';
    });
    builder.addCase(CreateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
    });
    builder.addCase(CreateOrder.rejected, (state, action: any) => {
      state.loading = false;
      state.msg = action.payload.msg;
    });
  },
});

export const { setOrder, setOrderCart } = OrderSlice.actions;

export default OrderSlice.reducer;
