import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  UpdateCategory,
  createCategory,
  getCategory,
  setCategory,
  setEditCategory,
} from '../../../../redux/slices/categorySilce';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditCategoryImg from '../../../upload/EditCategory';

import {
  EditCategoryUploadImg,
  UploadCategoryImg,
  clearCategorylimg,
  deleteCategorylimg,
} from '../../../../redux/slices/uploadSilce';
export default function EditCategory() {
  const dispatch = useAppDispatch();
  const { Newcategory, Categories, Editcategory } = useAppSelector(
    (state) => state.Categories
  );
  const { tmpcategory } = useAppSelector((state) => state.Upload);
  const parmas = useParams();
  // const history = useNavigate()
  // console.log(product);

  useEffect(() => {
    if (parmas.id) {
      Categories.forEach((category: any) => {
        if (category._id === parmas.id) dispatch(setEditCategory(category));
      });
    }
  }, [parmas.id, Categories]);

  const { categorylImg } = useAppSelector((state) => state.Upload);
  const handlecreateCategory = async (e: any) => {
    e.preventDefault();
    try {
      if (
        Categories.some((item: any) => {
          if (Newcategory.Name === item.Name && Newcategory._id !== item._id)
            return Newcategory.Name === item.Name;
        })
      ) {
        return alert('Category already exists!');
      } else {
        // Khi có sửa ảnh
        if (tmpcategory.length > 0)
          dispatch(EditCategoryUploadImg()).then((res: any) => {
            if (res.error) {
              return alert(res.payload);
            }
            dispatch(UpdateCategory()).then(async (res: any) => {
              dispatch(getCategory());
              dispatch(clearCategorylimg());
              dispatch(setCategory(''));
              alert('Category Upadated!');
            });
          });
        // Khi khong có sửa ảnh
        else
          dispatch(UpdateCategory()).then(async (res: any) => {
            dispatch(getCategory());
            dispatch(clearCategorylimg());
            dispatch(setCategory(''));
            alert('Category Upadated!');
          });
      }

      //  const res = await axios.put(`/api/category/${params.id}`, { Name: category });
      //  console.log(res);
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    dispatch(setEditCategory({ ...Editcategory, [name]: value }));
  };
  return (
    <div className="create_product">
      <form onSubmit={handlecreateCategory} className="createCarouselForm">
        <div className="row">
          <label htmlFor="productName">Title</label>
          <input
            type="text"
            name="Name"
            id="product_id"
            required
            value={Editcategory.Name}
            onChange={handleChangeInput}
          ></input>
        </div>

        <button type="submit">Update</button>
      </form>
      <div className="Carouselupload">
        <EditCategoryImg />
      </div>
    </div>
  );
}
