import { createSlice } from '@reduxjs/toolkit';

export interface IUpload {
  image: File;
  images: File;
  loading: String;
  err: String;
}
