import { width } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../api/config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  UploadImg,
  DeleteImg,
  settmp,
  setUploadEditImg,
  addImg,
  clearEditimg,
} from '../../redux/slices/uploadSilce';
import { setEditImg } from '../../redux/slices/productSlice';
// type image = {
//   public_id: String;
//   url: String;
// };
// const initialState = {
//   public_id: '',
//   url: '',
// };
export default function EditUpload() {
  // const [image, setImage] = useState<image>(initialState);
  // const [images, setImages] = useState<image[]>([]);
  const { editUploadedimage, editImgs } = useAppSelector(
    (state) => state.Upload
  );
  const { Editproduct } = useAppSelector((state) => state.Products);

  useEffect(() => {
    dispatch(setUploadEditImg(Editproduct.images));
  }, [Editproduct]);

  const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];
  const dispatch = useAppDispatch();

  const handleDestroyMulti = async (img: String) => {
    dispatch(settmp(img));
    // dispatch(setEditImg(img));
  };
  var reader = new FileReader();

  //upload Multi image to cloudinary
  const handleChangeMulti = async (file: any) => {
    Editproduct.Brand !== ''
      ? Editproduct.Name !== ''
        ? dispatch(addImg(file))
        : alert('Enter Product Name First')
      : alert('Please select Brand First');
    //
  };
  return (
    <div>
      {/* Nhập nhiều hình */}
      <div className="MultiUpload">
        <FileUploader
          disabled={
            editImgs?.length + editUploadedimage?.length > 2 ? true : false
          }
          handleChange={handleChangeMulti}
          name="file"
          types={fileTypes}
          className="uploadMulti"
        />

        <div
          className="ImgContainer"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          {editUploadedimage?.map((image: any, index) => {
            // console.log(typeof image.public_id);
            return (
              <div
                style={{ position: 'relative', width: '100%', height: '100%' }}
                key={index}
              >
                <div id="file_img">
                  <span onClick={() => handleDestroyMulti(image)}>X</span>
                  <img key={index} src={image?.url} alt=""></img>
                </div>
              </div>
            );
          })}
          {editImgs?.map((image: any, index) => {
            // console.log(typeof image.public_id);
            return (
              <div
                key={index}
                style={{ position: 'relative', width: '25vw', height: '17vh' }}
              >
                <div id="file_img">
                  <span onClick={() => handleDestroyMulti(image)}>X</span>
                  <img key={index} src={image?.url} alt=""></img>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <button type="submit" onClick={handleDestroyOne}>
        submit
      </button> */}
    </div>
  );
}
