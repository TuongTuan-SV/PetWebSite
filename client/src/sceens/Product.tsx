import { width } from '@mui/system';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

export default function Product() {
  const [image, setImage] = useState<String>();
  const [images, setImages] = useState<string[]>([]);

  const fileTypes = ['JPEG', 'PNG', 'GIF'];
  //upload image
  const handleUpload = (file: any) => {
    // e.preventDefault();
    try {
      const reader = new FileReader();
      // console.log(file[0]);
      reader.readAsDataURL(file[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        setImages((images) => [...images, event.target.result]);
      };
      // console.log(images);
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  };
  return (
    <div>
      <div></div>

      {/* Nhập nhiều hình */}
      <div className="MultiUpload">
        <FileUploader multiple={true} handleChange={handleUpload} name="file" />

        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            style={{ width: '100px', margin: '10px' }}
          ></img>
        ))}
      </div>
    </div>
  );
}
