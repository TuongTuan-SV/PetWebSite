import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface ICarousel {
  NewCarousel: INewCarousel;
  EditCarousel: INewCarousel;
  carousels: Array<object>;
  title: string;
  content: string;
  special: string;
  loading: boolean;
  err: string;
  msg: string;
}
export interface INewCarousel {
  title: string;
  content: string;
  special: string;
  image: Array<object>;
}

const CarouselinitialState: INewCarousel = {
  title: '',
  content: '',
  special: '',
  image: [],
};
const initialState: ICarousel = {
  NewCarousel: CarouselinitialState,
  EditCarousel: CarouselinitialState,
  carousels: [],
  title: '',
  content: '',
  special: '',
  loading: false,
  err: '',
  msg: '',
};

//ACTION
// GET CAROUSEL
export const getCarousel = createAsyncThunk(
  'Carousel/getCarousel',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/api/carousel`);
      // Inferred return type: Promise<MyData>
      // console.log(response.data.carousel.image);
      // console.log(response.data.brands);
      return response.data.carousel;
    } catch (err: any) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//CREATE POST
export const createCarousel = createAsyncThunk(
  'Carousel/createCarousel',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const response = await axios.post(`/api/carousel`, {
        ...data,
        image: state.Upload.carouselImg,
      });
      // Inferred return type: Promise<MyData>
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//UPDATE CAROUSEL
export const editCarousel = createAsyncThunk(
  'Product/editCarousel',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const images = state.Upload.editcarousel;
      console.log(data, images);
      const response = await axios.put(`/api/carousel/${data._id}`, {
        ...data,
        images,
      });
      // Inferred return type: Promise<MyData>
      // console.log(API_URL);
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
export const CarouselSlice = createSlice({
  name: 'Carousel',
  initialState,
  reducers: {
    setNewCarousel: (state, action) => {
      state.NewCarousel = action.payload;
    },
    setEditCarousel: (state, action) => {
      state.EditCarousel = action.payload;
    },
  },
  extraReducers: (builder) => {
    // GET CAROUSEL
    builder
      .addCase(getCarousel.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCarousel.fulfilled, (state, action) => {
        state.loading = false;
        state.carousels = action.payload;
      })
      .addCase(getCarousel.rejected, (state, action) => {
        state.loading = false;
      });
    //CREATE CAROUSEL
    builder
      .addCase(createCarousel.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCarousel.fulfilled, (state, action) => {
        state.loading = false;
        state.msg = action.payload;
      })
      .addCase(createCarousel.rejected, (state, action) => {
        state.loading = false;
        alert(action.payload);
      });
  },
});

export const { setNewCarousel, setEditCarousel } = CarouselSlice.actions;

export default CarouselSlice.reducer;
