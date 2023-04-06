import React, { useContext, useState } from 'react';
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
  getCarousel,
  setNewCarousel,
} from '../../../../redux/slices/carouselSlice';
import './CreateCarousel.css';
import CategorySelect from '../../createProduct/brandSelect/CategorySelect';
import {
  UploadCarouselImg,
  clearCarouselimg,
} from '../../../../redux/slices/uploadSilce';
const initialState = {
  title: '',
  content: '',
  special: '',
};

export default function CreateCarousel() {
  const { NewCarousel } = useAppSelector((state) => state.Carousel);
  const [loading, setLoading] = useState(false);
  const { Brands } = useAppSelector((state) => state.Brands);
  const { Categories } = useAppSelector((state) => state.Categories);
  const { images } = useAppSelector((state) => state.Upload);
  const dispatch = useAppDispatch();
  const handleCreateProduct = (e: any) => {
    e.preventDefault();
    dispatch(UploadCarouselImg()).then((res: any) => {
      if (res.error) {
        return alert(res.payload);
      }
      dispatch(createCarousel(NewCarousel)).then(() => {
        dispatch(clearCarouselimg());
        dispatch(setNewCarousel(initialState));
        dispatch(getCarousel());
        alert('Carousel Created!');
      });
    });
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    dispatch(setNewCarousel({ ...NewCarousel, [name]: value }));
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
            value={NewCarousel.title}
            onChange={handleChangeInput}
          ></input>
        </div>
        <div className="row">
          <label htmlFor="description">Content</label>
          <textarea
            name="content"
            id="description"
            required
            value={NewCarousel.content}
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
            value={NewCarousel.special}
            rows={2}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
      <div className="Carouselupload">
        <UploadCarousel />
      </div>
    </div>
  );
}
