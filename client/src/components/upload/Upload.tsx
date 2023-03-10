import { width } from '@mui/system';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../api/config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { UploadImg, DeleteImg } from '../../redux/slices/uploadSilce';
// type image = {
//   public_id: String;
//   url: String;
// };
// const initialState = {
//   public_id: '',
//   url: '',
// };
export default function Upload() {
  // const [image, setImage] = useState<image>(initialState);
  // const [images, setImages] = useState<image[]>([]);
  const { images } = useAppSelector((state) => state.Upload);
  const { Newproduct } = useAppSelector((state) => state.Products);
  images.map((image: any) => {
    console.log(image?.public_id);
  });

  // controll img drap drop boss true if there is image
  // const [toggleUpload, setToggleUpload] = useState(false);
  const [toggleUploadMulti, setToggleUploadMulti] = useState(false);

  const fileTypes = ['JPEG', 'PNG', 'GIF'];
  const dispatch = useAppDispatch();

  const handleDestroyMulti = async (id: String) => {
    dispatch(DeleteImg(id));
  };

  //upload Multi image to cloudinary
  const handleChangeMulti = async (file: any) => {
    Newproduct.Brand !== ''
      ? Newproduct.Name !== ''
        ? dispatch(UploadImg(file))
        : alert('Enter Product Name First')
      : alert('Please select Brand First');
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
          {images.map((image: any, index) => (
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
