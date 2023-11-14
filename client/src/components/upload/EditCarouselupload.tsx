import React, { ChangeEvent, useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios, { AxiosError } from 'axios';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  CarouseaddImg,
  DeleteCarouselImg,
  UploadCarouselImg,
  deleteCarouselimg,
  setCarouselEditImg,
  setCarouselImg,
  setCarousetmp,
} from '../../redux/slices/uploadSilce';
import { createCarousel, getCarousel } from '../../redux/slices/carouselSlice';
import { Link } from 'react-router-dom';

export default function EditCarouselupload() {
  const { editcarousel } = useAppSelector((state) => state.Upload);
  const { EditCarousel } = useAppSelector((state) => state.Carousel);

  //Gán hình vào cào biến khi nhấn vào trang
  useEffect(() => {
    console.log(EditCarousel.image);
    dispatch(setCarouselEditImg(EditCarousel.image));
  }, [EditCarousel]);

  const fileTypes = ['JPEG', 'PNG', 'JPG'];
  const dispatch = useAppDispatch();

  const handleDestroyMulti = async (img: any) => {
    dispatch(setCarousetmp(img));
  };

  const handleChangeMulti = async (file: any) => {
    dispatch(CarouseaddImg(file));
  };
  return (
    <div>
      {/* Nhập nhiều hình */}
      <div className="MultiUpload">
        <FileUploader
          disabled={editcarousel?.length > 0 ? true : false}
          handleChange={handleChangeMulti}
          name="file"
          types={fileTypes}
          className="uploadMulti"
        />
        <input
          type="file"
          name="file"
          id="file_up"
          onChange={handleChangeMulti}
        ></input>
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
            <span className="special">{EditCarousel.special}</span>
            <h1 className="title">{EditCarousel.title}</h1>
            <span className="content">{EditCarousel.content}</span>

            <Link to="shop">
              <button type="submit" className="toShop">
                Shop
                <KeyboardArrowRightIcon className="FilterBtn" />
              </button>
            </Link>
          </div>
          <div style={{ margin: 'auto', width: '60%' }}>
            {editcarousel?.map((image: any, index: any) => (
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
