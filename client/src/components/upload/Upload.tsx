import { width } from '@mui/system';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../api/config';

type image = {
  public_id: String;
  url: String;
};
const initialState = {
  public_id: '',
  url: '',
};
export default function Upload() {
  const [image, setImage] = useState<image>(initialState);
  const [images, setImages] = useState<image[]>([]);

  // controll img drap drop boss true if there is image
  const [toggleUpload, setToggleUpload] = useState(false);
  const [toggleUploadMulti, setToggleUploadMulti] = useState(false);

  const fileTypes = ['JPEG', 'PNG', 'GIF'];

  // const submitUpload = async () => {
  //   try {
  //     let formData = new FormData();
  //     // formData.append('file', image ?? '');
  //     images.map((image) => {
  //       formData.append('file', image);
  //     });

  //     console.log(formData);
  //     const brand = 'sdfsdf';
  //     formData.append('brand', brand);
  //     const res = await axios.post(`${API_URL}/api/upload`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     setImage(res.data);
  //     console.log(res.data);
  //   } catch (err) {
  //     if (err instanceof AxiosError) {
  //       console.log(err.response?.data.msg);
  //     } else {
  //       console.log('Unexpected error', err);
  //     }
  //   }
  // };

  //Delete image in cloudinary
  // const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // e.preventDefault();
  //   try {
  //     const reader = new FileReader();
  //     if (event.target.files) {
  //       var file = event.target.files[0];
  //       console.log(event.target.files[0]);
  //       setImage(file);
  //       console.log(image);
  //     }
  //     // // console.log(file[0]);

  //     // reader.readAsDataURL(file[0]); // read file as data url

  //     // reader.onload = (event: any) => {
  //     //   // called once readAsDataURL is completed
  //     //   setImage(event.target.result);
  //     //   // setImages((images) => [...images, event.target.result]);
  //     // };
  //     // // console.log(images);
  //   } catch (err) {
  //     if (err instanceof Error) console.log(err.message);
  //   }
  // };

  const handleDestroyOne = async () => {
    try {
      await axios.post(`${API_URL}/api/destroy`, {
        public_id: image?.public_id,
      });
      setToggleUpload(false);
      setImage(initialState);
      console.log(image);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  };

  const handleDestroyMulti = async (id: String) => {
    try {
      await axios.post(`${API_URL}/api/destroy`, {
        public_id: id,
      });
      if (images.length <= 3) setToggleUploadMulti(false);

      //Destroy click image
      images.forEach((image, index) => {
        if (image.public_id === id) {
          images.splice(index, 1);
        }
      });
      setImages([...images]);
      console.log(images.length);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  };
  //upload image to cloudinary

  const handleChangeOne = async (_file: any) => {
    try {
      //thêm thông báo nếu chưa chọn hoặc brand phải chọn mới dc chọn hình
      const file = _file;
      console.log(file);
      if (!file) return alert('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);
      const brand = 'sdfsdf';
      formData.append('brands', brand);
      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setToggleUpload(true);
      setImage(res.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  };

  //upload Multi image to cloudinary
  const handleChangeMulti = async (_file: any) => {
    try {
      //thêm thông báo nếu chưa chọn hoặc brand phải chọn mới dc chọn hình
      const file = _file;
      console.log(file);
      if (!file) return alert('File not exist.');

      if (file.size > 1024 * 1024)
        // 1mb
        return alert('Size too large!');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        // 1mb
        return alert('File format is incorrect.');

      let formData = new FormData();
      formData.append('file', file);

      //Select Brand floder
      const brand = 'multi';

      formData.append('brands', brand);
      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (images.length == 3) setToggleUploadMulti(true);
      setImages((images) => [...images, res.data]);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  };
  return (
    <div>
      <div></div>

      {/* Nhập nhiều hình */}
      <div className="MultiUpload">
        {/* Upload One */}
        <FileUploader
          disabled={toggleUpload}
          handleChange={handleChangeOne}
          name="file"
          types={fileTypes}
          className="uploadOne"
        />
        {/* Upload Multi */}
        <FileUploader
          disabled={toggleUploadMulti}
          handleChange={handleChangeMulti}
          name="file"
          types={fileTypes}
          className="uploadMulti"
        />
        {images.map((image, index) => (
          <div key={index}>
            <button
              type="submit"
              onClick={() => handleDestroyMulti(image.public_id)}
            >
              Destroy
            </button>

            <p>{image.public_id}</p>
          </div>
          //</div> <img
          //   key={index}
          //   src={image?.}
          //   alt=""
          //   style={{ width: '100px', margin: '10px' }}
          // ></img>
        ))}
      </div>
      <button type="submit" onClick={handleDestroyOne}>
        submit
      </button>
    </div>
  );
}
