import { width } from '@mui/system';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../api/config';
export default function Upload() {
  const [image, setImage] = useState<File>();
  const [images, setImages] = useState<File[]>([]);

  const fileTypes = ['JPEG', 'PNG', 'GIF'];

  const submitUpload = async () => {
    try {
      let formData = new FormData();
      // formData.append('file', image ?? '');
      images.map((image) => {
        formData.append('file', image);
      });

      console.log(formData);
      const brand = 'sdfsdf';
      formData.append('brand', brand);
      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  };
  //upload image
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    try {
      const reader = new FileReader();
      if (event.target.files) {
        var file = event.target.files[0];
        console.log(event.target.files[0]);
        setImage(file);
        console.log(image);
      }
      // // console.log(file[0]);

      // reader.readAsDataURL(file[0]); // read file as data url

      // reader.onload = (event: any) => {
      //   // called once readAsDataURL is completed
      //   setImage(event.target.result);
      //   // setImages((images) => [...images, event.target.result]);
      // };
      // // console.log(images);
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  };
  const handleChange = (file: any) => {
    setImages((images) => [...images, file]);
    console.log(images);
  };
  return (
    <div>
      <div></div>

      {/* Nhập nhiều hình */}
      <div className="MultiUpload">
        <input type="file" onChange={handleUpload}></input>
        {/* Upload Multi */}
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />

        {/* {images.map((image, index) => (
          // <img
          //   key={index}
          //   src={image?.}
          //   alt=""
          //   style={{ width: '100px', margin: '10px' }}
          // ></img>
          <p>"ádasd</p>
        ))} */}
      </div>
      <button type="submit" onClick={submitUpload}>
        submit
      </button>
    </div>
  );
}
