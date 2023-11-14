import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import CreateBlog from '../../components/dashboard/blog/CreateBlog/CreateBlog';

export interface IUpload {
  images: Array<object>;
  uploadedimage: Array<object>;
  editUploadedimage: Array<object>;
  editImgs: Array<object>;
  tmp: Array<object>;
  carouselImg: Array<object>;
  editcarousel: Array<object>;
  tmpcarousel: Array<object>;
  categorylImg: Array<object>;
  editcategory: Array<object>;
  tmpcategory: Array<object>;
  blog: {
    public_id?: string;
    url?: string;
  };
  editblog: {
    public_id?: string;
    url?: string;
  };
  tmpBlog: {
    public_id?: string;
    url?: string;
  };
  loading: boolean;
  err: string;
}

const initialState: IUpload = {
  images: [],
  uploadedimage: [],
  carouselImg: [],
  editUploadedimage: [],
  editcarousel: [],
  tmpcarousel: [],
  editImgs: [],
  tmp: [],
  categorylImg: [],
  editcategory: [],
  tmpcategory: [],
  blog: {},
  editblog: {},
  tmpBlog: {},
  loading: false,
  err: '',
};
//ACTION
//===========================================CREATE PRODUCT IMG===================================
//UPLOAD IMG TO CLOUDINARY
export const UploadImg = createAsyncThunk(
  'Upload/UploadImg',
  async (data: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    console.log(data.public_id);
    try {
      //thêm thông báo nếu chưa chọn hoặc brand phải chọn mới dc chọn hình
      const file = data.public_id;
      console.log(file);
      if (!file) return thunkAPI.rejectWithValue('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return thunkAPI.rejectWithValue('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return thunkAPI.rejectWithValue('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      //Select Brand floder
      const brand = state.Products.Newproduct.Brand;

      formData.append('brand', brand);
      const productName = state.Products.Newproduct.Name;
      formData.append('productname', productName);
      const res = await axios.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const img = state.Upload.images;
      // (item: any) => {
      //   if (typeof item.public_id === 'string') return item;
      // });
      // console.log(res.data);
      return { data: res.data, img: img };
      // if (images.length == 3) setToggleUploadMulti(true);
      // setImages((images) => [...images, res.data]);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//DELETE IMG FROM CLOUDINARY
export const DeleteImg = createAsyncThunk(
  'Upload/DeleteImg',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      console.log(data);
      await axios.post(`/api/destroy`, {
        public_id: data,
      });
      // if (images.length <= 3) setToggleUploadMulti(false);

      //Destroy click image
      const image = state.Upload.images.filter((image: any) => {
        console.log(image);
        if (image.public_id != data) return image;
      });
      return image;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//============================================EDIT PRODUCT IMG =======================================
//UPLOAD EDIT IMG TO CLOUDINARY
export const EditUploadImg = createAsyncThunk(
  'Upload/EditUploadImg',
  async (data: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    // console.log(data.File);
    try {
      //thêm thông báo nếu chưa chọn hoặc brand phải chọn mới dc chọn hình
      const file = data;
      console.log(file);
      if (!file) return thunkAPI.rejectWithValue('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return thunkAPI.rejectWithValue('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return thunkAPI.rejectWithValue('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      //Select Brand floder
      const brand = state.Products.Editproduct.Brand;

      formData.append('brand', brand);
      const productName = state.Products.Editproduct.Name;
      formData.append('productname', productName);
      const res = await axios.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const img = state.Upload.editImgs.filter((item: any) => {
        if (typeof item.public_id !== 'object') return item;
      });
      console.log(res.data);
      return { data: res.data, img: img };
      // if (images.length == 3) setToggleUploadMulti(true);
      // setImages((images) => [...images, res.data]);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//DELETE EDIT IMG FROM CLOUDINARY
export const EditDeleteImg = createAsyncThunk(
  'Upload/EditDeleteImg',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();

      await axios.post(`/api/destroy`, {
        public_id: data,
      });
      // if (images.length <= 3) setToggleUploadMulti(false);

      //Destroy click image
      const image = state.Upload.tmp.filter((image: any) => {
        if (image.public_id != data) return image;
      });
      return image;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//=============================================CREATE CAROUSEL IMG================================
//UPLOAD CAROUSEL IMG
export const UploadCarouselImg = createAsyncThunk(
  'Upload/UploadCarouselImg',
  async (data, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const carouselimg = state.Upload.carouselImg[0].public_id;
    // console.log(data.File);
    try {
      //thêm thông báo nếu chưa chọn hoặc brand phải chọn mới dc chọn hình
      const file = carouselimg;
      console.log(file);
      if (!file) return thunkAPI.rejectWithValue('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return thunkAPI.rejectWithValue('Size too large!');
      // return thunkAPI.rejectWithValue('Size too large!');

      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/jpg'
      )
        // 1mb
        return thunkAPI.rejectWithValue('File format is incorrect.');
      // return thunkAPI.rejectWithValue('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      const productName = state.Products.Newproduct.Name;
      formData.append('productname', productName);
      const res = await axios.post(`/api/uploadcarousel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const img = state.Upload.carouselImg.filter((item: any) => {
        if (typeof item.public_id !== 'object') return item;
      });
      console.log(res.data);
      return { data: res.data, img: img };
      // if (images.length == 3) setToggleUploadMulti(true);
      // setImages((images) => [...images, res.data]);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//DELETE CAROUSEL IMG
export const DeleteCarouselImg = createAsyncThunk(
  'Upload/DeleteCarouselImg',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      console.log(data);
      await axios.post(`/api/destroycarousel`, {
        public_id: data,
      });
      // if (images.length <= 3) setToggleUploadMulti(false);

      //Destroy click image
      const image = state.Upload.images.filter((image: any) => {
        console.log(image);
        if (image.public_id != data) return image;
      });
      return image;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//=================================================EDIT CAROUSEL IMG==================================
export const EditCarouselUploadImg = createAsyncThunk(
  'Upload/EditCarouselUploadImg',
  async (data: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    // console.log(data.File);
    try {
      //thêm thông báo nếu chưa chọn hoặc brand phải chọn mới dc chọn hình
      const file = data;
      console.log(file);
      if (!file) return thunkAPI.rejectWithValue('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return thunkAPI.rejectWithValue('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return thunkAPI.rejectWithValue('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      const productName = state.Products.Editproduct.Name;
      formData.append('productname', productName);
      const res = await axios.post(`/api/uploadcarousel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const img = state.Upload.editImgs.filter((item: any) => {
        if (typeof item.public_id !== 'object') return item;
      });
      console.log(res.data);
      return { data: res.data, img: img };
      // if (images.length == 3) setToggleUploadMulti(true);
      // setImages((images) => [...images, res.data]);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//DELETE EDIT IMG FROM CLOUDINARY
export const EditCarouselDeleteImg = createAsyncThunk(
  'Upload/EditCarouselDeleteImg',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();

      await axios.post(`/api/destroycarousel`, {
        public_id: data,
      });
      // if (images.length <= 3) setToggleUploadMulti(false);

      //Destroy click image
      const image = state.Upload.tmp.filter((image: any) => {
        if (image.public_id != data) return image;
      });
      return image;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//=================================================CREATE CATEGORY IMG==================================
//UPLOAD CATEGORY IMG
export const UploadCategoryImg = createAsyncThunk(
  'Upload/UploadCategoryImg',
  async (data, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const categoryimg = state.Upload.categorylImg[0].public_id;
    // console.log(data.File);
    try {
      //thêm thông báo nếu chưa chọn hoặc brand phải chọn mới dc chọn hình
      const file = categoryimg;
      console.log(file);
      if (!file) return thunkAPI.rejectWithValue('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return thunkAPI.rejectWithValue('Size too large!');
      // return alert('Size too large!');

      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/jpg'
      )
        // 1mb
        return thunkAPI.rejectWithValue('File format is incorrect.');
      // return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      const CategoryName = state.Categories.Newcategory.Name;
      formData.append('CategoryName', CategoryName);
      const res = await axios.post(`/api/uploadcategory`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return { data: res.data };
      // if (images.length == 3) setToggleUploadMulti(true);
      // setImages((images) => [...images, res.data]);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//DELETE CATEGORY IMG
export const DeleteCategoryImg = createAsyncThunk(
  'Upload/DeleteCategoryImg',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      console.log(data);
      await axios.post(`/api/destroycategory`, {
        public_id: data,
      });
      // if (images.length <= 3) setToggleUploadMulti(false);

      //Destroy click image
      const image = state.Upload.categoryimg.filter((image: any) => {
        console.log(image);
        if (image.public_id != data) return image;
      });
      return image;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//=================================================EDIT CATEGORY IMG==================================
export const EditCategoryUploadImg = createAsyncThunk(
  'Upload/EditCategoryUploadImg',
  async (data, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const categoryimg = state.Upload.editcategory[0].public_id;
    // console.log(data.File);
    try {
      //thêm thông báo nếu chưa chọn hoặc brand phải chọn mới dc chọn hình
      const file = categoryimg;
      console.log(file);
      if (!file) return thunkAPI.rejectWithValue('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return thunkAPI.rejectWithValue('Size too large!');
      // return alert('Size too large!');

      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/jpg'
      )
        // 1mb
        return thunkAPI.rejectWithValue('File format is incorrect.');
      // return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      const CategoryName = state.Categories.Newcategory.Name;
      formData.append('CategoryName', CategoryName);
      const res = await axios.post(`/api/uploadcategory`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return { data: res.data };
      // if (images.length == 3) setToggleUploadMulti(true);
      // setImages((images) => [...images, res.data]);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//DELETE EDIT IMG FROM CLOUDINARY
export const EditCategoryDeleteImg = createAsyncThunk(
  'Upload/EditCategoryDeleteImg',
  async (data: any, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();

      await axios.post(`/api/destroycarousel`, {
        public_id: data,
      });
      // if (images.length <= 3) setToggleUploadMulti(false);

      //Destroy click image
      const image = state.Upload.tmp.filter((image: any) => {
        if (image.public_id != data) return image;
      });
      return image;
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//=================================================CREATE Blog IMG==================================
//UPLOAD CATEGORY IMG
export const UploadBlogImg = createAsyncThunk(
  'Upload/UploadBlogImg',
  async (data, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const blogImg = state.Upload.blog.public_id;
    // console.log(data.File);
    try {
      //thêm thông báo nếu chưa chọn hoặc brand phải chọn mới dc chọn hình
      const file = blogImg;
      console.log(file);
      if (!file) return thunkAPI.rejectWithValue('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return thunkAPI.rejectWithValue('Size too large!');
      // return alert('Size too large!');

      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/jpg'
      )
        // 1mb
        return thunkAPI.rejectWithValue('File format is incorrect.');
      // return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      const BlogTitle = state.Blog.NewBlog.Title;
      formData.append('BlogTitle', BlogTitle);
      const res = await axios.post(`/api/uploadblog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);
      return { data: res.data };
      // if (images.length == 3) setToggleUploadMulti(true);
      // setImages((images) => [...images, res.data]);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//=================================================Edit Blog IMG==================================
//UPLOAD CATEGORY IMG
export const EditBlogImg = createAsyncThunk(
  'Upload/EditBlogImg',
  async (data, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const blogImg = state.Upload.editblog.public_id;
    // console.log(data.File);
    try {
      //thêm thông báo nếu chưa chọn hoặc brand phải chọn mới dc chọn hình
      const file = blogImg;
      console.log(file);
      if (!file) return thunkAPI.rejectWithValue('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return thunkAPI.rejectWithValue('Size too large!');
      // return alert('Size too large!');

      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/jpg'
      )
        // 1mb
        return thunkAPI.rejectWithValue('File format is incorrect.');
      // return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      const BlogTitle = state.Blog.EditBlog.Title;
      formData.append('BlogTitle', BlogTitle);
      const res = await axios.post(`/api/uploadblog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return { data: res.data };
      // if (images.length == 3) setToggleUploadMulti(true);
      // setImages((images) => [...images, res.data]);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
export const DeleteEditBlogImg = createAsyncThunk(
  'Upload/DeleteEditBlogImg',
  async (data, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      await axios.post(`/api/destroyblog`, {
        public_id: state.Upload.tmpBlog.public_id,
      });
      // if (images.length <= 3) setToggleUploadMulti(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  }
);
//SLICE
export const uploadSlice = createSlice({
  name: 'Upload',
  initialState,
  reducers: {
    //=================Action for Create product=======================
    setImg: (state, action) => {
      console.log(action);
      var url = URL.createObjectURL(action.payload);

      state.images.push({
        public_id: action.payload,
        url: url,
      });
    },
    clearimg: (state) => {
      state.images = [];
    },
    deleteimg: (state, action) => {
      const img = state.images.filter((item: any) => {
        // console.log(current(item));
        return item.public_id !== action.payload.public_id;
      });
      state.images = img;
    },
    //=================================================================
    //=================Action for Edit product=======================
    setUploadEditImg: (state, action) => {
      console.log(action.payload);
      state.editUploadedimage = action.payload;
    },
    addImg: (state, action) => {
      console.log(action.payload);
      var url = URL.createObjectURL(action.payload);

      state.editImgs.push({
        public_id: action.payload,
        url: url,
      });
      console.log(typeof action.payload);
    },
    subtractimg: (state) => {
      state.editImgs = state.editImgs.slice(1);
    },
    settmp: (state, action) => {
      state.tmp.push(action.payload);
      const img = state.editUploadedimage.filter((item: any) => {
        // console.log(current(item));
        return item.public_id !== action.payload.public_id;
      });
      state.editUploadedimage = img;
    },
    clearEditimg: (state) => {
      state.tmp = [];
      state.editImgs = [];
    },
    //=================================================================
    //=================Action for Create Carousel=======================
    setCarouselImg: (state, action) => {
      console.log(action.payload);
      var url = URL.createObjectURL(action.payload);

      state.carouselImg.push({
        public_id: action.payload,
        url: url,
      });
    },
    clearCarouselimg: (state) => {
      state.carouselImg = [];
    },
    deleteCarouselimg: (state, action) => {
      const img = state.carouselImg.filter((item: any) => {
        // console.log(current(item));
        return item.public_id !== action.payload.public_id;
      });
      state.carouselImg = img;
    },
    //=================================================================
    //=================Action for Edit Carousel=======================
    setCarouselEditImg: (state, action) => {
      console.log(action.payload);
      state.editcarousel = action.payload;
    },
    CarouseaddImg: (state, action) => {
      console.log(action.payload);
      var url = URL.createObjectURL(action.payload);

      state.editcarousel.push({
        public_id: action.payload,
        url: url,
      });
      console.log(typeof action.payload);
    },
    setCarousetmp: (state, action) => {
      state.tmpcarousel.push(action.payload);
      const img = state.editcarousel.filter((item: any) => {
        // console.log(current(item));
        return item.public_id !== action.payload.public_id;
      });
      state.editcarousel = img;
    },
    clearCarouseimg: (state) => {
      state.tmpcarousel = [];
      state.editcarousel = [];
    },
    //=================================================================
    //=================Action for Create Category=======================
    setCategorylImg: (state, action) => {
      console.log(action.payload);
      var url = URL.createObjectURL(action.payload);

      state.categorylImg.push({
        public_id: action.payload,
        url: url,
      });
    },
    clearCategorylimg: (state) => {
      state.categorylImg = [];
    },
    deleteCategorylimg: (state, action) => {
      const img = state.categorylImg.filter((item: any) => {
        // console.log(current(item));
        return item.public_id !== action.payload.public_id;
      });
      state.categorylImg = img;
    },
    //=================================================================
    //=================Action for Edit Carousel=======================
    setCategoryEditImg: (state, action) => {
      console.log(action.payload);
      state.editcategory = action.payload;
    },
    CategoryaddImg: (state, action) => {
      console.log(action.payload);
      var url = URL.createObjectURL(action.payload);

      state.editcategory.push({
        public_id: action.payload,
        url: url,
      });
      console.log(typeof action.payload);
    },
    setCategorytmp: (state, action) => {
      state.tmpcategory.push(action.payload);
      const img = state.editcategory.filter((item: any) => {
        // console.log(current(item));
        return item.public_id !== action.payload.public_id;
      });
      state.editcategory = img;
    },
    clearCategoryimg: (state) => {
      state.tmpcategory = [];
      state.editcategory = [];
    },
    //=================Action for Create Blog=======================
    setBlogImg: (state, action) => {
      console.log(action.payload);
      var url = URL.createObjectURL(action.payload);

      state.blog = {
        public_id: action.payload,
        url: url,
      };
    },
    clearBloglimg: (state) => {
      state.blog = {};
    },
    //=================Action for Edit Blog=======================
    setEditBlogimg: (state, action) => {
      state.editblog = action.payload;
    },
    addEditBlogimg: (state, action) => {
      var url = URL.createObjectURL(action.payload);

      state.editblog = {
        public_id: action.payload,
        url: url,
      };
    },
    settmpblogimg: (state, action) => {
      state.tmpBlog = action.payload;
      state.editblog = {};
    },
    clearEditBlogimg: (state) => {
      state.tmpBlog = {};
    },
  },
  extraReducers: (builder) => {
    //====================================CREATE PRODUCT=======================================
    //Upload Image to Cloudinary
    builder
      .addCase(UploadImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UploadImg.fulfilled, (state, action: any) => {
        state.loading = false;
        console.log(action.payload);

        state.uploadedimage.push(action.payload.data);
      })
      .addCase(UploadImg.rejected, (state, action: any) => {
        state.err = action.payload;
        state.loading = false;
      });
    //Delete Img
    builder
      .addCase(DeleteImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(DeleteImg.fulfilled, (state, action: any) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(DeleteImg.rejected, (state, action: any) => {
        state.err = action.payload;
        state.loading = false;
      });
    //====================================CREATE CAROUSEL=======================================
    //Upload Carousel Image to Cloudinary
    builder
      .addCase(UploadCarouselImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UploadCarouselImg.fulfilled, (state, action: any) => {
        state.loading = false;
        state.carouselImg = action.payload.img;
        state.carouselImg.push(action.payload.data);
      })
      .addCase(UploadCarouselImg.rejected, (state, action: any) => {
        state.err = action.payload;
        state.loading = false;
      });
    //Delete Carousel Img
    builder
      .addCase(DeleteCarouselImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(DeleteCarouselImg.fulfilled, (state, action: any) => {
        state.loading = false;
        state.carouselImg = action.payload;
      })
      .addCase(DeleteCarouselImg.rejected, (state, action: any) => {
        state.err = action.payload;
        state.loading = false;
      });
    //====================================EDIT PRODUCT=======================================
    //Upload Edit Image to Cloudinary
    builder
      .addCase(EditUploadImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(EditUploadImg.fulfilled, (state, action: any) => {
        state.loading = false;
        console.log(action.payload);
        // state.editImgs = state.editImgs.slice(1);
        state.editUploadedimage.push(action.payload.data);
      })
      .addCase(EditUploadImg.rejected, (state, action: any) => {
        state.loading = false;
        state.err = action.payload;
      });
    //Delete EditImg
    builder
      .addCase(EditDeleteImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(EditDeleteImg.fulfilled, (state, action: any) => {
        state.loading = false;
        state.tmp = action.payload;
      })
      .addCase(EditDeleteImg.rejected, (state, action: any) => {
        state.loading = false;
        state.err = action.payload;
      });
    //====================================EDIT CAROUSEL=======================================
    //Upload Edit Carousel Image to Cloudinary
    builder
      .addCase(EditCarouselUploadImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(EditCarouselUploadImg.fulfilled, (state, action: any) => {
        state.loading = false;
        console.log(action.payload);
        state.editcarousel = action.payload.img;
        state.editcarousel.push(action.payload.data);
      })
      .addCase(EditCarouselUploadImg.rejected, (state, action: any) => {
        state.loading = false;
        state.err = action.payload;
      });
    //Delete EditCarouselImg
    builder
      .addCase(EditCarouselDeleteImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(EditCarouselDeleteImg.fulfilled, (state, action: any) => {
        state.loading = false;
        state.tmpcarousel = action.payload;
      })
      .addCase(EditCarouselDeleteImg.rejected, (state, action: any) => {
        state.loading = false;
        state.err = action.payload;
      });
    //====================================CREATE CATEGORY=======================================
    builder
      .addCase(UploadCategoryImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UploadCategoryImg.fulfilled, (state, action: any) => {
        state.loading = false;
        state.categorylImg = [];
        state.categorylImg = action.payload.data;
      })
      .addCase(UploadCategoryImg.rejected, (state, action: any) => {
        state.err = action.payload;
        state.loading = false;
      });
    //Delete Carousel Img
    builder
      .addCase(DeleteCategoryImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(DeleteCategoryImg.fulfilled, (state, action: any) => {
        state.loading = false;
        state.categorylImg = action.payload;
      })
      .addCase(DeleteCategoryImg.rejected, (state, action) => {
        state.loading = false;
      });
    //====================================CREATE CATEGORY=======================================
    //Upload Edit Carousel Image to Cloudinary
    builder
      .addCase(EditCategoryUploadImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(EditCategoryUploadImg.fulfilled, (state, action: any) => {
        state.loading = false;
        console.log(action.payload);
        state.editcategory = [];
        state.editcategory.push(action.payload.data);
      })
      .addCase(EditCategoryUploadImg.rejected, (state, action: any) => {
        state.loading = false;
        state.err = action.payload;
      });
    //Delete EditCarouselImg
    builder
      .addCase(EditCategoryDeleteImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(EditCategoryDeleteImg.fulfilled, (state, action: any) => {
        state.loading = false;
        state.tmpcategory = action.payload;
      })
      .addCase(EditCategoryDeleteImg.rejected, (state, action: any) => {
        state.loading = false;
        state.err = action.payload;
      });
    //====================================CREATE Blog=======================================
    builder
      .addCase(UploadBlogImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UploadBlogImg.fulfilled, (state, action: any) => {
        state.loading = false;
        state.blog = action.payload.data;
      });
    //====================================EDit Blog=======================================
    builder
      .addCase(EditBlogImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(EditBlogImg.fulfilled, (state, action: any) => {
        state.loading = false;
        state.editblog = action.payload.data;
      })
      .addCase(EditBlogImg.rejected, (state, action: any) => {
        state.loading = false;
        alert(action.payload);
      });
    builder
      .addCase(DeleteEditBlogImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(DeleteEditBlogImg.fulfilled, (state, action: any) => {
        state.loading = false;
        state.tmpBlog = {};
      });
  },
});

export const {
  setImg,
  deleteimg,
  clearimg,
  setUploadEditImg,
  settmp,
  subtractimg,
  addImg,
  clearEditimg,
  setCarouselImg,
  clearCarouselimg,
  deleteCarouselimg,
  setCarouselEditImg,
  setCarousetmp,
  clearCarouseimg,
  CarouseaddImg,
  setCategorylImg,
  deleteCategorylimg,
  clearCategorylimg,
  setCategoryEditImg,
  setCategorytmp,
  clearCategoryimg,
  CategoryaddImg,
  setBlogImg,
  clearBloglimg,
  settmpblogimg,
  clearEditBlogimg,
  setEditBlogimg,
  addEditBlogimg,
} = uploadSlice.actions;

export default uploadSlice.reducer;
