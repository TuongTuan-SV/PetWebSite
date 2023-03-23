import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface IProduct {
  products: Array<object>;
  adminproduct: Array<object>;
  Hotproducts: Array<object>;
  NewCreateProducts: Array<object>;
  loading: boolean;
  sort: string;
  Newproduct: INewProduct;
  search: ISearch;
  adminsearch: ISearch;
}
export interface ISearch {
  category: Array<string>;
  brand: Array<string>;
  price: number;
  loading: boolean;
  sort: string;
  search: string;
}
const SearchinitialState: ISearch = {
  category: [],
  brand: [],
  price: 0,
  loading: false,
  sort: '',
  search: '',
};
interface Image {
  public_id: string;
  url: string;
}
export interface INewProduct {
  Name: string;
  Description: string;
  Short_Description: string;
  Price: number;
  Stocks: number;
  Brand: string;
  Category: string;
  images: Array<Image>;
  reviews: object;
}
const ProductinitialState: INewProduct = {
  Name: '',
  Description: '',
  Short_Description: '',
  Price: 0,
  Stocks: 0,
  Brand: '',
  Category: '',
  images: [],
  reviews: [],
};
const initialState: IProduct = {
  products: [],
  adminproduct: [],
  Hotproducts: [],
  NewCreateProducts: [],
  loading: false,
  sort: '',
  Newproduct: ProductinitialState,
  search: SearchinitialState,
  adminsearch: SearchinitialState,
};

//ACTION
//Get all products
export const addReview = createAsyncThunk(
  'Product/addReview',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const review = data.review;
      review.Username = state.User.User.FirstName;
      review.userid = state.User.User._id;
      console.log(data);
      const response = await axios.post(`/api/products/${data.id}`, {
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

//Get all products
export const createProduct = createAsyncThunk(
  'Product/createProduct',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const images = state.Upload.images;
      console.log(data);
      const response = await axios.post(
        `/api/products`,
        { ...data, images },
        {
          headers: { Authorization: state.User.token },
        }
      );
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

//Get all products
export const getProducts = createAsyncThunk(
  'Product/getProducts',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const search = state.Products.search;

      const response = await axios.get(
        `/api/products/?${search.category.join('&')}${search.brand.join('&')}&${
          search.price > 0 ? `Price[lte]=${search.price}` : ''
        }&${search.sort}&&Name_Lower[regex]=${search.search}`
      );
      console.log(response);
      // // Inferred return type: Promise<MyData>
      // // console.log(API_URL);
      // console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//Admin Get all products
export const getAdminProducts = createAsyncThunk(
  'Product/getAdminProducts',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const search = state.Products.adminsearch;

      const response = await axios.get(
        `/api/products/?${search.category.join('&')}${search.brand.join('&')}&${
          search.price > 0 ? `Price[lte]=${search.price}` : ''
        }&${search.sort}&&Name_Lower[regex]=${search.search}`
      );
      console.log(response);
      // // Inferred return type: Promise<MyData>
      // // console.log(API_URL);
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
      // console.log(
      //   response.data.products.sort((a: any, b: any) =>
      //     a.sold < b.sold ? 1 : -1
      //   )
      // );

      // console.log(
      //   response.data.products.sort((a: any, b: any) =>
      //     a.sold < b.sold ? 1 : -1
      //   )
      // );
      return response.data.products.sort((a: any, b: any) =>
        a.sold < b.sold ? 1 : -1
      );
      // Inferred return type: Promise<MyData>
      // console.log(API_URL);
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
      return response.data.products.slice(0, 3);
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
    setNewProduct: (state, action) => {
      state.Newproduct = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setAdminSearch: (state, action) => {
      state.adminsearch = action.payload;
    },
    setBrand: (state, action) => {
      const check = state.search.brand.includes(action.payload);

      if (check) {
        const brand = state.search.brand.filter((item: any) => {
          if (item != action.payload) return item;
        });

        state.search.brand = brand;
      } else {
        state.search.brand.push(action.payload);
      }
    },
    setCategory: (state, action) => {
      const check = state.search.category.includes(action.payload);

      if (check) {
        const category = state.search.category.filter((item: any) => {
          if (item != action.payload) return item;
        });

        state.search.category = category;
      } else {
        state.search.category.push(action.payload);
      }
    },
    setAdminBrand: (state, action) => {
      const check = state.adminsearch.brand.includes(action.payload);

      if (check) {
        const brand = state.adminsearch.brand.filter((item: any) => {
          if (item != action.payload) return item;
        });

        state.adminsearch.brand = brand;
      } else {
        state.adminsearch.brand.push(action.payload);
      }
    },
    setAdminCategory: (state, action) => {
      const check = state.adminsearch.category.includes(action.payload);

      if (check) {
        const category = state.adminsearch.category.filter((item: any) => {
          if (item != action.payload) return item;
        });

        state.adminsearch.category = category;
      } else {
        state.adminsearch.category.push(action.payload);
      }
    },
    setPrice: (state, action) => {
      state.search.price = action.payload;
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
        state.products = action.payload.products;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
      });
    //ADMIN GET ALL PRODUCT
    builder
      .addCase(getAdminProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.adminproduct = action.payload.products;
      })
      .addCase(getAdminProducts.rejected, (state, action) => {
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
        state.NewCreateProducts = action.payload;
      })
      .addCase(getNewtProducts.rejected, (state, action) => {
        state.loading = false;
      });
    //CREATE PRODUCT
    builder
      .addCase(createProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
      });
    builder
      .addCase(addReview.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {
  addProducts,
  setSort,
  setNewProduct,
  setSearch,
  setBrand,
  setCategory,
  setPrice,
  setAdminBrand,
  setAdminCategory,
  setAdminSearch,
} = productSlice.actions;

export default productSlice.reducer;
