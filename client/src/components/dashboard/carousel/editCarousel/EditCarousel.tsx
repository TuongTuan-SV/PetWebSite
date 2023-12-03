import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../../../utils/loading/Loading';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  createProduct,
  setNewProduct,
} from '../../../../redux/slices/productSlice';

import UploadCarousel from '../../../upload/UploadCarousel';
import {
  createCarousel,
  editCarousel,
  getCarousel,
  setEditCarousel,
  setNewCarousel,
} from '../../../../redux/slices/carouselSlice';

import CategorySelect from '../../createProduct/brandSelect/CategorySelect';
import {
  EditCarouselDeleteImg,
  EditCarouselUploadImg,
  UploadCarouselImg,
  clearCarouselimg,
} from '../../../../redux/slices/uploadSilce';
import { useParams } from 'react-router-dom';
import EditCarouselupload from '../../../upload/EditCarouselupload';
const initialState = {
  title: '',
  content: '',
  special: '',
};

export default function EditCarousel() {
  const { NewCarousel } = useAppSelector((state) => state.Carousel);
  const [loading, setLoading] = useState(false);
  const { Brands } = useAppSelector((state) => state.Brands);
  const { carousels, EditCarousel } = useAppSelector((state) => state.Carousel);
  const { editcarousel, tmpcarousel } = useAppSelector((state) => state.Upload);
  const parmas = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (parmas.id) {
      carousels.forEach((carousel: any) => {
        if (carousel._id === parmas.id) dispatch(setEditCarousel(carousel));
      });
    }
  }, [parmas.id, carousels]);
  const handleCreateProduct = async (e: any) => {
    e.preventDefault();
    const deletetmp = tmpcarousel?.map(async (img: any) => {
      await dispatch(EditCarouselDeleteImg(img.public_id));
    });
    const uploadNewimg = editcarousel.map(async (img: any) => {
      if (typeof img.public_id === 'object') {
        //console.log('addimg');
        await dispatch(EditCarouselUploadImg(img.public_id));
      }
    });
    Promise.all(uploadNewimg).then(() => {
      dispatch(editCarousel(EditCarousel)).then(() => {
        dispatch(clearCarouselimg());
        dispatch(setNewCarousel(initialState));
        dispatch(getCarousel());
        alert('Carousel Update!');
      });
    });
    deletetmp;
  };
  // const handleCreateProduct = (e: any) => {
  //   e.preventDefault();
  // };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    dispatch(setEditCarousel({ ...EditCarousel, [name]: value }));
  };

  return (
    <div className="create_product">
      <form onSubmit={handleCreateProduct} className="createCarouselForm">
        <div className="row">
          <label htmlFor="productName">Title</label>
          <input
            type="text"
            name="title"
            id="product_id"
            required
            value={EditCarousel.title}
            onChange={handleChangeInput}
          ></input>
        </div>
        <div className="row">
          <label htmlFor="description">Content</label>
          <textarea
            name="content"
            id="description"
            required
            value={EditCarousel.content}
            rows={5}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className="row">
          <label htmlFor="short_description">Special</label>
          <textarea
            name="special"
            id="Short_Description"
            required
            value={EditCarousel.special}
            rows={2}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <button type="submit">Update</button>
      </form>
      <div className="Carouselupload">
        <EditCarouselupload />
      </div>
    </div>
  );
}
