import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface IBlog {
  Blog: Array<object>;
  NewBlog: INewBlog;
  EditBlog: INewBlog;
  loading: boolean;
  msg: string;
}
export interface INewBlog {
  Title: string;
  Title_Lower: string;
  Poster: string;
  Description: Array<[object]>;
  images?: Array<[object]>;
}
const NewBloginitialState: INewBlog = {
  Title: '',
  Title_Lower: '',
  Poster: '',
  Description: [],
  images: [],
};
const initialState: IBlog = {
  Blog: [],
  NewBlog: NewBloginitialState,
  EditBlog: NewBloginitialState,
  loading: false,
  msg: '',
};
/// ADD NEW BLOG
export const createBlog = createAsyncThunk(
  'Blog/createBlog',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const img = state.Upload.blog;
      const blog = state.Blog.NewBlog;

      const res = await axios.post('/api/blog', { ...blog, img });
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
/// GET ALL BLOG
export const getBlog = createAsyncThunk(
  'Blog/getBlog',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const img = state.Upload.blog;
      const blog = state.Blog.blog;

      const res = await axios.get('/api/blog');
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
/// DELETE BLOG
export const deleteBlog = createAsyncThunk(
  'Blog/deleteBlog',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const img = state.Upload.blog;
      const blog = state.Blog.blog;
      console.log(data);
      data.image
        ? await axios.post(`/api/destroyblog`, {
            public_id: data.image.public_id,
          })
        : null;
      const res = await axios.delete(`/api/blog/${data._id}`);
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);

/// GET ALL BLOG
export const updateBlog = createAsyncThunk(
  'Blog/updateBlog',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const img = state.Upload.editblog;
      const blog = state.Blog.EditBlog;
      console.log(blog);
      const res = await axios.put(`/api/blog/${blog._id}`, { ...blog, img });
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//Add Review
export const addReview = createAsyncThunk(
  'Product/addReview',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const review = data.review;
      review.Username = state.User.User.FirstName;
      review.userid = state.User.User._id;
      console.log(data);
      const response = await axios.post(`/api/blog/${data.id}`, {
        reivew: review,
      });

      // console.log(response.data);
      // return response.data;
    } catch (err: any) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
const blogSlice = createSlice({
  name: 'Blog',
  initialState,
  reducers: {
    setNewBlog: (state, action) => {
      state.NewBlog = action.payload;
    },
    clearNewBlog: (state) => {
      state.NewBlog = NewBloginitialState;
    },
    setEditBlog: (state, action) => {
      state.EditBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GET BLOG
    builder
      .addCase(getBlog.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getBlog.fulfilled, (state, action: any) => {
        state.loading = false;
        state.Blog = action.payload.Blog;
      })
      .addCase(getBlog.rejected, (state, action: any) => {
        state.loading = false;
        state.msg = action.payload;
      });
    //ADD BLOG
    builder
      .addCase(createBlog.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createBlog.rejected, (state, action: any) => {
        state.loading = false;
        state.msg = action.payload;
      });
    //UPDATE BLOG
    builder
      .addCase(updateBlog.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateBlog.rejected, (state, action: any) => {
        state.loading = false;
        state.msg = action.payload;
      });
  },
});

export const { setNewBlog, clearNewBlog, setEditBlog } = blogSlice.actions;

export default blogSlice.reducer;
