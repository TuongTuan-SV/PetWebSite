import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface IUpload {
  images: Array<object>;
  carouselImg: Array<object>;
  editcarousel: Array<object>;
  tmpcarousel: Array<object>;
  editImgs: Array<object>;
  tmp: Array<object>;
  loading: boolean;
  err: string;
}

const initialState: IUpload = {
  images: [],
  carouselImg: [],
  editcarousel: [],
  tmpcarousel: [],
  editImgs: [],
  tmp: [],
  loading: false,
  err: '',
};
//ACTION
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
      if (!file) return alert('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return alert('File format is incorrect.');

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
      const img = state.Upload.images.filter((item: any) => {
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
      if (!file) return alert('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return alert('File format is incorrect.');

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
      if (!file) return alert('File not exist.');

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
export const EditCarouselUploadImg = createAsyncThunk(
  'Upload/EditCarouselUploadImg',
  async (data: any, thunkAPI) => {
    const state: any = thunkAPI.getState();
    // console.log(data.File);
    try {
      //thêm thông báo nếu chưa chọn hoặc brand phải chọn mới dc chọn hình
      const file = data;
      console.log(file);
      if (!file) return alert('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return alert('File format is incorrect.');

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
//SLICE
export const uploadSlice = createSlice({
  name: 'Upload',
  initialState,
  reducers: {
    //=================Action for Create product=======================
    setImg: (state, action) => {
      console.log(action.payload);
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
      state.editImgs = action.payload;
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
    settmp: (state, action) => {
      state.tmp.push(action.payload);
      const img = state.editImgs.filter((item: any) => {
        // console.log(current(item));
        return item.public_id !== action.payload.public_id;
      });
      state.editImgs = img;
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
  },
  extraReducers: (builder) => {
    //Upload Image to Cloudinary
    builder
      .addCase(UploadImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UploadImg.fulfilled, (state, action: any) => {
        state.loading = false;
        console.log(action.payload);
        state.images = action.payload.img;
        state.images.push(action.payload.data);
      })
      .addCase(UploadImg.rejected, (state, action) => {
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
      .addCase(DeleteImg.rejected, (state, action) => {
        state.loading = false;
      });
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
      .addCase(DeleteCarouselImg.rejected, (state, action) => {
        state.loading = false;
      });
    //Upload Edit Image to Cloudinary
    builder
      .addCase(EditUploadImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(EditUploadImg.fulfilled, (state, action: any) => {
        state.loading = false;
        console.log(action.payload);
        state.editImgs = action.payload.img;
        state.editImgs.push(action.payload.data);
      })
      .addCase(EditUploadImg.rejected, (state, action) => {
        state.loading = false;
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
      .addCase(EditDeleteImg.rejected, (state, action) => {
        state.loading = false;
      });
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
      .addCase(EditCarouselUploadImg.rejected, (state, action) => {
        state.loading = false;
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
      .addCase(EditCarouselDeleteImg.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {
  setImg,
  deleteimg,
  clearimg,
  setUploadEditImg,
  settmp,
  addImg,
  clearEditimg,
  setCarouselImg,
  clearCarouselimg,
  deleteCarouselimg,
  setCarouselEditImg,
  setCarousetmp,
  clearCarouseimg,
  CarouseaddImg,
} = uploadSlice.actions;

export default uploadSlice.reducer;
