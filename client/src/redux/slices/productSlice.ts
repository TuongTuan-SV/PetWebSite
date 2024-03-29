import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface IProduct {
  products: Array<object>;
  adminproduct: Array<object>;
  Hotproducts: Array<object>;
  NewCreateProducts: Array<object>;
  loading: boolean;
  Newproduct: INewProduct;
  Editproduct: INewProduct;
  search: ISearch;
  adminsearch: ISearch;
}
export interface ISearch {
  category: Array<string>;
  brand: Array<string>;
  Maxprice: number;
  Minprice: number;
  price: Array<any>;
  loading: boolean;
  sort: string;
  search: string;
}
const SearchinitialState: ISearch = {
  category: [],
  brand: [],
  Maxprice: 950,
  Minprice: 0,
  price: [0, 950],
  loading: false,
  sort: '',
  search: '',
};
interface Image {
  public_id: string;
  url: string;
}
export interface INewProduct {
  _id: string;
  Name: string;
  Description: string;
  Short_Description: string;
  Price: number;
  Stocks: number;
  Brand: string;
  Category: Array<string>;
  images: Array<Image>;
  reviews: object;
  Discount: number;
}
const ProductinitialState: INewProduct = {
  _id: '',
  Name: '',
  Description: '',
  Short_Description: '',
  Price: 0,
  Stocks: 0,
  Brand: 'nobrand',
  Category: [],
  images: [],
  reviews: [],
  Discount: 0,
};
const initialState: IProduct = {
  products: [],
  adminproduct: [],
  Hotproducts: [],
  NewCreateProducts: [],
  loading: false,

  Newproduct: ProductinitialState,
  Editproduct: ProductinitialState,
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

//CREATE NEW PRODUCT
export const createProduct = createAsyncThunk(
  'Product/createProduct',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const images = state.Upload.uploadedimage;
      // console.log(images);
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

//UPDATE PRORUDCT
export const editProduct = createAsyncThunk(
  'Product/editProduct',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const images = state.Upload.editUploadedimage;
      console.log(data, images);
      const response = await axios.put(`/api/products/${data._id}`, {
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
//GET ALL PRODUCT
export const getProducts = createAsyncThunk(
  'Product/getProducts',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const search = state.Products.search;

      const response = await axios.get(
        `/api/products/?${search.category.join('&')}&${search.brand.join(
          '&'
        )}&${`Price[lte]=${search.price[1]}`}&${`Price[gte]=${search.price[0]}`}&${
          search.sort
        }&Name_Lower[regex]=${search.search.toLowerCase()}`
      );
      // console.log(response);
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
        `/api/products/?${search.category.join('&')}&${search.brand}&${
          search.price > 0 ? `Price[lte]=${search.price}` : ''
        }&${search.sort}&&Name_Lower[regex]=${search.search.toLowerCase()}`
      );
      // console.log(response);
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
      const response = await axios.get(`/api/products/?limit=4`);
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
        a.Sold < b.Sold ? 1 : -1
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
      const response = await axios.get(`/api/products/?limit=4`);
      // Inferred return type: Promise<MyData>
      // console.log(API_URL);
      return response.data.products.slice(0, 9);
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
    //================================ADMIN SECTION============================
    //Creat product
    addProducts: (state, action) => {
      state.products = action.payload.products;
    },
    //Change Newproduct info when input
    setNewProduct: (state, action) => {
      state.Newproduct = action.payload;
    },
    //Set Newproduct Category
    setNewCategory: (state, action) => {
      state.Newproduct.Category = action.payload;
    },
    setDiscount: (state, action) => {
      console.log(action.payload);
      if (action.payload >= 0 && action.payload <= 100) {
        state.Newproduct.Discount = action.payload;
      }
    },
    //Change Newproduct info when input
    setEditproduct: (state, action) => {
      state.Editproduct = action.payload;
    },
    //Set Editproduct category
    setEditcategory: (state, action) => {
      state.Editproduct.Category = action.payload;
    },
    //Set Editproduct img
    setEditImg: (state, action) => {
      const img = state.Editproduct.images.filter((image: any) => {
        return image.public_id != action.payload.public_id;
      });
      state.Editproduct.images = img;
    },
    //Set searcn on admin
    setAdminSearch: (state, action) => {
      state.adminsearch.search = action.payload;
    },
    //Set Search category on admin
    setAdminCategory: (state, action) => {
      state.adminsearch.category = action.payload;
    },
    //Set Search brand on admin
    setAdminBrand: (state, action) => {
      state.adminsearch.brand = action.payload;
    },
    setAdminSort: (state, action) => {
      state.adminsearch.sort = action.payload;
    },
    //Set search on client
    setSearch: (state, action) => {
      state.search.search = action.payload;
    },

    //==========================================================================
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
    setSort: (state, action) => {
      state.search.sort = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.search.Maxprice = action.payload;
    },
    setMinPrice: (state, action) => {
      state.search.Minprice = action.payload;
    },
    sePrice: (state, action) => {
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
  setMaxPrice,
  setMinPrice,
  sePrice,
  setAdminBrand,
  setAdminCategory,
  setAdminSearch,
  setAdminSort,
  setNewCategory,
  setDiscount,
  setEditproduct,
  setEditcategory,
  setEditImg,
} = productSlice.actions;

export default productSlice.reducer;
