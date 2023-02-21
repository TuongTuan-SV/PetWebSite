import { width } from '@mui/system';
import React, { useState } from 'react';

export default function Product() {
  const [images, setImages] = useState<string[]>([]);

  //upload image
  const handleUpload = (e: any) => {
    e.preventDefault();
    try {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]); // read file as data url

      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        setImages((images) => [...images, event.target.result]);
      };
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  };
  return (
    <div>
      <input type="file" name="file" id="file_up" onChange={handleUpload} />
      {images.map((image, index) => (
        <img key={index} src={image} alt="" style={{ width: '100px' }}></img>
      ))}
    </div>
  );
}
