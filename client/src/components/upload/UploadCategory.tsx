import { width } from '@mui/system';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../api/config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  deleteCategorylimg,
  setCategorylImg,
} from '../../redux/slices/uploadSilce';
// type image = {
//   public_id: String;
//   url: String;
// };
// const initialState = {
//   public_id: '',
//   url: '',
// };
export default function UploadCategory() {
  // const [image, setImage] = useState<image>(initialState);
  // const [images, setImages] = useState<image[]>([]);
  const { categorylImg } = useAppSelector((state) => state.Upload);
  const { Newproduct } = useAppSelector((state) => state.Products);
  // images.map((image: any) => {
  //   console.log(image?.public_id);
  // });

  // controll img drap drop boss true if there is image
  // const [toggleUpload, setToggleUpload] = useState(false);
  const [toggleUploadMulti, setToggleUploadMulti] = useState(false);

  const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];
  const dispatch = useAppDispatch();

  const handleDestroyMulti = async (img: String) => {
    dispatch(deleteCategorylimg(img));
  };

  //upload Multi image to cloudinary
  const handleChangeMulti = async (file: any) => {
    dispatch(setCategorylImg(file));
  };
  return (
    <div>
      {/* Nhập nhiều hình */}
      <div className="MultiUpload">
        <FileUploader
          disabled={categorylImg.length > 0 ? true : false}
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
          className="CategoryImgContainer"
          // style={{ backgroundColor: `${NewCarousel.color}`, display: 'flex' }}
        >
          <div style={{ margin: 'auto', width: '60%' }}>
            {categorylImg.length > 0
              ? categorylImg.map((image: any, index) => (
                  <div key={index} id="file_img">
                    <span onClick={() => handleDestroyMulti(image)}>X</span>
                    <img key={index} src={image?.url} alt=""></img>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      {/* <button type="submit" onClick={handleDestroyOne}>
        submit
      </button> */}
    </div>
  );
}
