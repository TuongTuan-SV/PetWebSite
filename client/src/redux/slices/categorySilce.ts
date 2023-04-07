import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ICategory {
  Categories: [];
  SelectCategory: null | string;
  Newcategory: INewCategory;
  loading: boolean;
  err: string;
  msg: string;
}
export interface INewCategory {
  Name: string;
  image: Array<object>;
}
const CategoryinitialState: INewCategory = {
  Name: '',
  image: [],
};
const initialState: ICategory = {
  Categories: [],
  Newcategory: CategoryinitialState,
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
      const response = await axios.get(`/api/category`);
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
  'Category/postCategory',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();

      const Name = state.Categories.Newcategory.Name;
      const img = state.Upload.categorylImg;

      const response = await axios.post(`/api/category`, {
        Name: Name,
        image: img,
      });
      // Inferred return type: Promise<MyData>
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//SLICE
export const CategoriesSlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    //Add brand to state
    addCategory: (state, action) => {
      state.Categories = action.payload;
    },
    //Add seleted brand to state
    setCategory: (state, action) => {
      state.Newcategory.Name = action.payload;
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
    //CREATE Category
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

export const { addCategory, setCategory } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
