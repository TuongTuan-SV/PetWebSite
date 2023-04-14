import { width } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../api/config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  CategoryaddImg,
  clearCategoryimg,
  deleteCategorylimg,
  setCarouselEditImg,
  setCategoryEditImg,
  setCategorylImg,
  setCategorytmp,
  settmp,
} from '../../redux/slices/uploadSilce';
// type image = {
//   public_id: String;
//   url: String;
// };
// const initialState = {
//   public_id: '',
//   url: '',
// };
export default function EditCategoryImg() {
  // const [image, setImage] = useState<image>(initialState);
  // const [images, setImages] = useState<image[]>([]);
  const { editcategory, tmpcategory } = useAppSelector((state) => state.Upload);
  const { Editcategory } = useAppSelector((state) => state.Categories);

  useEffect(() => {
    dispatch(clearCategoryimg());
    dispatch(setCategoryEditImg(Editcategory.image));
  }, [Editcategory]);
  // images.map((image: any) => {
  //   console.log(image?.public_id);
  // });

  // controll img drap drop boss true if there is image
  // const [toggleUpload, setToggleUpload] = useState(false);
  const [toggleUploadMulti, setToggleUploadMulti] = useState(false);

  const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];
  const dispatch = useAppDispatch();

  const handleDestroyMulti = async (img: String) => {
    dispatch(setCategorytmp(img));
  };

  //upload Multi image to cloudinary
  const handleChangeMulti = async (file: any) => {
    dispatch(CategoryaddImg(file));
  };
  return (
    <div>
      {/* Nhập nhiều hình */}
      <div className="MultiUpload">
        <FileUploader
          disabled={editcategory.length > 0 ? true : false}
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
            {editcategory?.map((image: any, index) => (
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
