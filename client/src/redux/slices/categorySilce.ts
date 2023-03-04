import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../api/config';
export interface ICategory {
  Categories: [];
  SelectCategory: null | string;
  loading: boolean;
  err: string;
  msg: string;
}
const initialState: ICategory = {
  Categories: [],
  SelectCategory: '',
  loading: false,
  err: '',
  msg: '',
};
//ACTION
// GET BRAND
export const getCategory = createAsyncThunk(
  'Category/getCategory',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/category`);
      // Inferred return type: Promise<MyData>
      // console.log(API_URL);
      return response.data.categories;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//CREATE POST
export const createCategory = createAsyncThunk(
  'Category/postBrand',
  async (data: any, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/api/category`, data);
      // Inferred return type: Promise<MyData>
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//SLICE
export const BrandSlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    //Add brand to state
    addCategory: (state, action) => {
      state.Categories = action.payload;
    },
    //Add seleted brand to state
    setCategory: (state, action) => {
      state.SelectCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GET BRAND
    builder
      .addCase(getCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.Categories = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
      });
    //CREATE BRAND
    builder
      .addCase(createCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { addCategory, setCategory } = BrandSlice.actions;

export default BrandSlice.reducer;
