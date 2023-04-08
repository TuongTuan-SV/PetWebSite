import React, { ChangeEvent, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios, { AxiosError } from 'axios';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  DeleteCarouselImg,
  UploadCarouselImg,
  deleteCarouselimg,
  setCarouselImg,
} from '../../redux/slices/uploadSilce';
import { Link } from 'react-router-dom';

export default function UploadCarousel() {
  const { carouselImg } = useAppSelector((state) => state.Upload);
  const { NewCarousel } = useAppSelector((state) => state.Carousel);

  const fileTypes = ['JPEG', 'PNG', 'JPG'];
  const dispatch = useAppDispatch();

  const handleDestroyMulti = async (img: any) => {
    dispatch(deleteCarouselimg(img));
  };

  const handleChangeMulti = async (file: any) => {
    dispatch(setCarouselImg(file));
  };
  return (
    <div>
      {/* Nhập nhiều hình */}
      <div className="MultiUpload">
        <FileUploader
          disabled={carouselImg.length > 0 ? true : false}
          handleChange={handleChangeMulti}
          name="file"
          types={fileTypes}
          className="uploadMulti"
        />

        <div
          className="ImgContainer"
          // style={{ backgroundColor: `${NewCarousel.color}`, display: 'flex' }}
        >
          <div
            style={{
              textAlign: 'left',
              width: '35%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              position: 'absolute',
              zIndex: '10',
              left: '10%',
              top: '20%',
            }}
          >
            <span className="special">{NewCarousel.special}</span>
            <h1 className="title">{NewCarousel.title}</h1>
            <span className="content">{NewCarousel.content}</span>
            <Link to="shop">
              <button type="submit" className="toShop">
                Shop
                <KeyboardArrowRightIcon className="FilterBtn" />
              </button>
            </Link>
          </div>
          <div style={{ margin: 'auto', width: '60%' }}>
            {carouselImg?.map((image: any, index) => (
              <div key={index} id="file_img">
                <span onClick={() => handleDestroyMulti(image)}>X</span>
                <img key={index} src={image?.url} alt=""></img>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <button type="submit" onClick={handleDestroyOne}>
        submit
      </button> */}
    </div>
  );
}
