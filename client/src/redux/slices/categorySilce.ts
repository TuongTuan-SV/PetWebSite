import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ICategory {
  Categories: [];
  SelectCategory: null | string;
  Newcategory: INewCategory;
  Editcategory: INewCategory;
  search: ISearch;
  loading: boolean;
  err: string;
  msg: string;
}
export interface ISearch {
  Maxproduct: number;
  Minproduct: number;
  price: Array<any>;
  loading: boolean;
  sort: string;
  search: string;
}
export interface INewCategory {
  _id: string;
  Name: string;
  image: Array<object>;
}
const CategoryinitialState: INewCategory = {
  _id: '',
  Name: '',
  image: [],
};
const SearchinitialState: ISearch = {
  Maxproduct: 950,
  Minproduct: 0,
  price: [0, 950],
  loading: false,
  sort: '',
  search: '',
};
const initialState: ICategory = {
  Categories: [],
  search: SearchinitialState,
  Newcategory: CategoryinitialState,
  Editcategory: CategoryinitialState,
  SelectCategory: '',
  loading: false,
  err: '',
  msg: '',
};
//ACTION
// GET CATEGORY
export const getCategory = createAsyncThunk(
  'Category/getCategory',
  async (data, thunkAPI) => {
    try {
      const state: any = await thunkAPI.getState();
      const search = state.Categories.search;

      const response = await axios.get(
        `/api/category?&${
          search.sort
        }&&Name_lower[regex]=${search.search.toLowerCase()}`
      );
      // Inferred return type: Promise<MyData>
      // console.log(response);
      return response.data;
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
      const category = state.Categories.Categories;
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
//UPDATE CATEGORY
export const UpdateCategory = createAsyncThunk(
  'Category/UpdateCategory',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const category = state.Categories.Categories;
      const Name = state.Categories.Editcategory.Name;
      const id = state.Categories.Editcategory._id;
      const img = state.Upload.editcategory;

      const response = await axios.put(`/api/category/${id}`, {
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
    setSort: (state, action) => {
      state.search.sort = action.payload;
    },
    //Set search on client
    setSearch: (state, action) => {
      state.search.search = action.payload;
    },
    //Edit Category
    //Set init category
    setEditCategory: (state, action) => {
      state.Editcategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GET CATEGORY
    builder
      .addCase(getCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.Categories = action.payload.category;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
      });
    //CREATE CATEGORY
    builder
      .addCase(createCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload;
      })
      .addCase(createCategory.rejected, (state, action: any) => {
        state.loading = false;
        state.msg = action.payload;
      });
    //UPDATE CATEGORY
    builder
      .addCase(UpdateCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UpdateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload;
      })
      .addCase(UpdateCategory.rejected, (state, action: any) => {
        state.loading = false;
        state.msg = action.payload;
      });
  },
});

export const { addCategory, setCategory, setSearch, setSort, setEditCategory } =
  CategoriesSlice.actions;

export default CategoriesSlice.reducer;
