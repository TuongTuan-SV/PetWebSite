import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface IUpload {
  images: Array<object>;
  loading: boolean;
  err: String;
}

const initialState: IUpload = {
  images: [],
  loading: false,
  err: 'String',
};
//ACTION
//UPLOAD IMG TO CLOUDINARY
export const UploadImg = createAsyncThunk(
  'Upload/UploadImg',
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
      const brand = state.Products.Newproduct.Brand;

      formData.append('brand', brand);
      const productName = state.Products.Newproduct.Name;
      formData.append('productname', productName);
      const res = await axios.post(`/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      return res.data;
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
//SLICE
export const uploadSlice = createSlice({
  name: 'Upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Upload Image to Cloudinary
    builder
      .addCase(UploadImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UploadImg.fulfilled, (state, action: any) => {
        state.loading = true;
        state.images.push(action.payload);
      })
      .addCase(UploadImg.rejected, (state, action) => {
        state.loading = true;
      });
    //Delete Img
    builder
      .addCase(DeleteImg.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(DeleteImg.fulfilled, (state, action: any) => {
        state.loading = true;
        state.images = action.payload;
      })
      .addCase(DeleteImg.rejected, (state, action) => {
        state.loading = true;
      });
  },
});

export const {} = uploadSlice.actions;

export default uploadSlice.reducer;
