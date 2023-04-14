import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IBrand {
  Brands: Array<object>;
  SelectBrand: null | string;
  loading: boolean;
  err: string;
  msg: string;
}

const initialState: IBrand = {
  Brands: [],
  SelectBrand: '',
  loading: false,
  err: '',
  msg: '',
};
//ACTION
// GET BRAND
export const getBrand = createAsyncThunk(
  'Brand/getBrand',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/api/brands`);
      // Inferred return type: Promise<MyData>
      // console.log(API_URL);
      // console.log(response.data.brands);
      return response.data.brands;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//CREATE POST
export const createBrand = createAsyncThunk(
  'Brand/postBrand',
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post(`/api/brands`, { Name: data });
      // Inferred return type: Promise<MyData>
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//SLICE
export const BrandSlice = createSlice({
  name: 'Brand',
  initialState,
  reducers: {
    //Add brand to state
    addBrands: (state, action) => {
      state.Brands = action.payload.Brands;
    },
    //Add seleted brand to state
    setBrand: (state, action) => {
      state.SelectBrand = action.payload.brand;
    },
  },
  extraReducers: (builder) => {
    //GET BRAND
    builder
      .addCase(getBrand.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.Brands = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.loading = false;
      });
    //CREATE BRAND
    builder
      .addCase(createBrand.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { addBrands, setBrand } = BrandSlice.actions;

export default BrandSlice.reducer;
