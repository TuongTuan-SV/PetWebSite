import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface INewOrder {
  FirstName: string;
  LastName: string;
  Address: string;
  Provice: string;
  District: string;
  Ward: string;
  Cart: Array<[object]>;
  OrderNote: string;
  Status: string;
  PaymentMethod: number;
  Total: number;
}
export interface IOrder {
  order: INewOrder;
  loading: boolean;
  Orders: Array<object>;
  OrderStatus: boolean;
  msg: string;
}
const OrderinitialState: INewOrder = {
  FirstName: '',
  LastName: '',
  Address: '',
  Provice: '',
  District: '',
  Ward: '',
  Cart: [],
  OrderNote: '',
  PaymentMethod: 0,
  Status: 'Pending',
  Total: 0,
};

const initialState: IOrder = {
  order: OrderinitialState,
  Orders: [],
  loading: false,
  msg: '',
  OrderStatus: false,
};
//CREATE ORDER
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
export const UpdataStatus = createAsyncThunk(
  'Order/UpdataStatus',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const response = await axios.put(
        `/api/order/${data.id}`,
        { status: data.status },
        {
          headers: { Authorization: state.User.token },
        }
      );
      return response.data;

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
//GET ALL ORDER
export const getAllOrder = createAsyncThunk(
  'Order/getAllOrder',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();

      const response = await axios.get('/api/order');
      // console.log(response.data);
      return response.data;

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
    setProvice: (state, action) => {
      state.order.Provice = action.payload;
    },
    setDistrict: (state, action) => {
      state.order.District = action.payload;
    },
    setWard: (state, action) => {
      state.order.Ward = action.payload;
    },
    clearOrder: (state) => {
      state.order = OrderinitialState;
    },
    setTotal: (state, action) => {
      state.order.Total = action.payload;
    },
  },
  extraReducers: (builder) => {
    //CREATE ORDER
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
    //GET ORDER
    builder.addCase(getAllOrder.pending, (state, action) => {
      state.loading = true;
      state.msg = '';
    });
    builder.addCase(getAllOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.Orders = action.payload;
    });
    builder.addCase(getAllOrder.rejected, (state, action: any) => {
      state.loading = false;
      state.msg = action.payload.msg;
    });
    //Update status
    builder.addCase(UpdataStatus.pending, (state, action) => {
      state.loading = true;
      state.msg = '';
    });
    builder.addCase(UpdataStatus.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(UpdataStatus.rejected, (state, action: any) => {
      state.loading = false;
      state.msg = action.payload.msg;
    });
  },
});

export const {
  setOrder,
  setOrderCart,
  setDistrict,
  setProvice,
  setWard,
  clearOrder,
  setTotal,
} = OrderSlice.actions;

export default OrderSlice.reducer;
