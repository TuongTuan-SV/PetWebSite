import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api/config';

export interface IProduct {
  products: Array<object>;
  Hotproducts: Array<object>;
  NewProducts: Array<object>;
  loading: boolean;
  sort: string;
}

const initialState: IProduct = {
  products: [],
  Hotproducts: [],
  NewProducts: [],
  loading: false,
  sort: '',
};

//ACTION
//Get all products
export const getProducts = createAsyncThunk(
  'Product/getProducts',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products`);
      // Inferred return type: Promise<MyData>
      // console.log(API_URL);
      // console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//Get Top3 Hot products
export const getHotProducts = createAsyncThunk(
  'Product/getHotProducts',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products/?limit=9`);
      // Inferred return type: Promise<MyData>
      // console.log(API_URL);
      return response.data.slice(0, 3);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//Get Top 3 New products
export const getNewtProducts = createAsyncThunk(
  'Product/getNewProducts',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/api/products/?limit=9`);
      // Inferred return type: Promise<MyData>
      // console.log(API_URL);

      return response.data.sort((a: any, b: any) => (a.sold < b.sold ? 1 : -1));
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//SLICE
export const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    //Add product to state
    addProducts: (state, action) => {
      state.products = action.payload.products;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GET ALL PRODUCT
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
      });

    //GET HOT PRODUCTS
    builder
      .addCase(getHotProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getHotProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.Hotproducts = action.payload;
      })
      .addCase(getHotProducts.rejected, (state, action) => {
        state.loading = false;
      });

    //GET NEW PRODUCTS
    builder
      .addCase(getNewtProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getNewtProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.NewProducts = action.payload;
      })
      .addCase(getNewtProducts.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { addProducts, setSort } = productSlice.actions;

export default productSlice.reducer;
