import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  createCategory,
  getCategory,
  setCategory,
} from '../../../../redux/slices/categorySilce';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UploadCategory from '../../../upload/UploadCategory';
import './CreateCategory.css';
import {
  UploadCategoryImg,
  clearCategorylimg,
} from '../../../../redux/slices/uploadSilce';
export default function CreateCategory() {
  const dispatch = useAppDispatch();
  const { Newcategory } = useAppSelector((state) => state.Categories);

  const handlecreateCategory = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(UploadCategoryImg()).then(() =>
        dispatch(createCategory()).then(() => {
          dispatch(getCategory());
          dispatch(clearCategorylimg());
          dispatch(setCategory(''));
          alert('Category Created!');
        })
      );

      //  const res = await axios.put(`/api/category/${params.id}`, { Name: category });
      //  console.log(res);
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="create_product">
      <form onSubmit={handlecreateCategory} className="createCarouselForm">
        <div className="row">
          <label htmlFor="productName">Title</label>
          <input
            type="text"
            name="title"
            id="product_id"
            required
            value={Newcategory.Name}
            onChange={(e: any) => dispatch(setCategory(e.target.value))}
          ></input>
        </div>

        <button type="submit">Create</button>
      </form>
      <div className="Carouselupload">
        <UploadCategory />
      </div>
    </div>
  );
}
