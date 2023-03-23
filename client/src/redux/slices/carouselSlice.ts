import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface ICarousel {
  image: Array<object>;
  loading: boolean;
  err: string;
  msg: string;
}

const initialState: ICarousel = {
  image: [],
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
      console.log(response.data.carousel.image);
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
      const response = await axios.post(`/api/carousel`, { image: data });
      // Inferred return type: Promise<MyData>
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const CarouselSlice = createSlice({
  name: 'Carousel',
  initialState,
  reducers: {
    //Add brand to state
    addBrands: (state, action) => {
      state.image = action.payload.images;
    },
    //Add seleted brand to state
    setCarousel: (state, action) => {
      state.image = action.payload.brand;
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
        state.image = action.payload;
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
      });
  },
});

export const { addBrands, setCarousel } = CarouselSlice.actions;

export default CarouselSlice.reducer;
