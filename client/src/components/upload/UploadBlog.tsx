import { width } from '@mui/system';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios, { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setImg,
  deleteimg,
  clearBloglimg,
  setBlogImg,
} from '../../redux/slices/uploadSilce';

export default function UploadBlog() {
  const { blog } = useAppSelector((state) => state.Upload);

  const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];
  const dispatch = useAppDispatch();

  const handleDestroy = async () => {
    dispatch(clearBloglimg());
  };

  //upload Multi image to cloudinary
  const handleUpload = async (file: any) => {
    dispatch(setBlogImg(file));
  };
  return (
    <div>
      {/* Nhập nhiều hình */}
      <div className="MultiUpload">
        <FileUploader
          disabled={blog.url ? true : false}
          handleChange={handleUpload}
          name="file"
          types={fileTypes}
          className="uploadMulti"
          style={{ margin: 'auto' }}
        />
        {blog.url ? (
          <div
            className="ImgContainer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            <div
              style={{ position: 'relative', width: '100%', height: '100%' }}
            >
              <div id="file_img">
                <span onClick={() => handleDestroy()}>X</span>
                <img src={blog.url} alt=""></img>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {/* <button type="submit" onClick={handleDestroyOne}>
        submit
      </button> */}
    </div>
  );
}
