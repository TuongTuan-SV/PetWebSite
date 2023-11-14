import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface IBrand {
  Brands: Array<object>;
  SelectBrand: null | string;
  Newbrand: string;
  EditBrand: string;
  search: ISearch;
  loading: boolean;
  err: string;
  msg: string;
}
export interface ISearch {
  sort: string;
  search: string;
}
const SearchinitialState: ISearch = {
  sort: '',
  search: '',
};
const initialState: IBrand = {
  Brands: [],
  SelectBrand: '',
  Newbrand: '',
  EditBrand: '',
  search: SearchinitialState,
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
      const state: any = thunkAPI.getState();
      const search = state.Brands.search;
      const response = await axios.get(
        `/api/brands?&${search.sort}&Name[regex]=${search.search.toLowerCase()}`
      );
      // Inferred return type: Promise<MyData>
      // console.log(API_URL);
      // console.log(response.data.brands);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//CREATE Brand
export const createBrand = createAsyncThunk(
  'Brand/postBrand',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const response = await axios.post(`/api/brands`, {
        Name: state.Brands.Newbrand,
      });
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
    setNewBrand: (state, action) => {
      state.Newbrand = action.payload;
    },
    setEditBrand: (state, action) => {
      state.EditBrand = action.payload;
    },
    setSearch: (state, action) => {
      state.search.search = action.payload;
    },
    setSort: (state, action) => {
      state.search.sort = action.payload;
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
        state.Brands = action.payload.brands;
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

export const {
  addBrands,
  setBrand,
  setNewBrand,
  setEditBrand,
  setSearch,
  setSort,
} = BrandSlice.actions;

export default BrandSlice.reducer;
