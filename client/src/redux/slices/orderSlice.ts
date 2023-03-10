import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IOrder {
  FirstName: string;
  LastName: string;
  Address: string;
  Country: string;
  City: string;
  PostalCode: number;
  Cart?: Array<[object]>;
  PaymentMethod: number;
  Total: number;
}

const OrderinitialState: IOrder = {
  FirstName: '',
  LastName: '',
  Address: '',
  Country: '',
  City: '',
  PostalCode: 0,
  Cart: [],
  PaymentMethod: 0,
  Total: 0,
};

const initialState = {
  order: OrderinitialState,
};
export const CreateOrder = createAsyncThunk(
  'Order/CreateOrder',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      console.log(state);
      const { _id, email } = state.User.User;
      const response = await axios.post(
        '/api/order',
        { order: state.Order.order },
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

export const OrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = OrderSlice.actions;

export default OrderSlice.reducer;
