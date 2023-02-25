import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api/config';
export interface IBrand {
  Brands: Array<String>;
  SelectBrand: String;
}

const initialState: IBrand = {
  Brands: [],
  SelectBrand: '',
};

export const fetchBrand = createAsyncThunk('users/getBrand', async () => {
  const response = await axios.get(`${API_URL}\api\brand`);
  // Inferred return type: Promise<MyData>
  return response;
});

export const BrandSlice = createSlice({
  name: 'Brand',
  initialState,
  reducers: {
    getBrands: (state, action) => {
      state.Brands = action.payload.Brands;
    },
    setBrand: (state, action) => {
      state.SelectBrand = action.payload.brand;
    },
  },
  extraReducers: (builder) => {
    /**Mai làm tiepé */
  },
});

export const { getBrands, setBrand } = BrandSlice.actions;

export default BrandSlice.reducer;
