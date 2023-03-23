import { width } from '@mui/system';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../api/config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  UploadImg,
  DeleteImg,
  DeleteCarouselImg,
  UploadCarouselImg,
} from '../../redux/slices/uploadSilce';
import { createCarousel, getCarousel } from '../../redux/slices/carouselSlice';
// type image = {
//   public_id: String;
//   url: String;
// };
// const initialState = {
//   public_id: '',
//   url: '',
// };
export default function UploadCarousel() {
  // const [image, setImage] = useState<image>(initialState);
  // const [images, setImages] = useState<image[]>([]);
  const { image } = useAppSelector((state) => state.Carousel);
  const { Newproduct } = useAppSelector((state) => state.Products);
  // image.map((image: any) => {
  //   console.log(image?.public_id);
  // });

  // controll img drap drop boss true if there is image
  // const [toggleUpload, setToggleUpload] = useState(false);
  const [toggleUploadMulti, setToggleUploadMulti] = useState(false);

  const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];
  const dispatch = useAppDispatch();

  const handleDestroyMulti = async (id: String) => {
    dispatch(DeleteCarouselImg(id));
  };

  //upload Multi image to cloudinary
  const handleChangeMulti = async (file: any) => {
    dispatch(UploadCarouselImg(file)).then((res) =>
      dispatch(createCarousel(res.payload)).then(() => dispatch(getCarousel()))
    );

    //
  };
  return (
    <div>
      <div></div>

      {/* Nhập nhiều hình */}
      <div className="MultiUpload">
        <FileUploader
          // disabled={toggleUploadMulti}
          handleChange={handleChangeMulti}
          name="file"
          types={fileTypes}
          className="uploadMulti"
        />
        <div className="ImgContainer">
          {image?.map((image: any, index) => (
            <div key={index} id="file_img">
              <span onClick={() => handleDestroyMulti(image.public_id)}>X</span>
              <img key={index} src={image?.url} alt=""></img>
            </div>
          ))}
        </div>
      </div>
      {/* <button type="submit" onClick={handleDestroyOne}>
        submit
      </button> */}
    </div>
  );
}
