import React, { useContext, useState } from 'react';

import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createBrand, getBrand } from '../../../redux/slices/brandSlice';
import './brand.css';
export default function Brand() {
  const dispatch = useAppDispatch();
  const { Brands } = useAppSelector((state) => state.Brands);
  const [brand, setBrand] = useState<any>('');
  const [onEdit, setOnedit] = useState(false);
  const [id, setId] = useState('');

  const handlecreateBrand = async (e: any) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(`/api/brands/${id}`, { Name: brand });
        console.log(res);
      } else {
        // const res = await axios.post(
        //   '/api/category',
        //   { name: category },
        //   {
        //     headers: { Authorization: token },
        //   }
        // );
        // console.log(res);
        dispatch(createBrand(brand)).then(() => dispatch(getBrand()));
      }
      setOnedit(false);
      setBrand('');
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id: any, name: any) => {
    setId(id);
    setBrand(name);
    setOnedit(true);
  };

  const deleteCategory = async (id: any) => {
    try {
      const res = await axios.delete(`/api/brands/${id}`);
      console.log(res.data.msg);
      dispatch(getBrand());
    } catch (err: any) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <form onSubmit={handlecreateBrand}>
        <label htmlFor="category">Brand</label>
        <input
          type="text"
          name="category"
          value={brand}
          required
          onChange={(e) => setBrand(e.target.value)}
        ></input>
        <button type="submit">{onEdit ? 'Update' : 'Save'}</button>
      </form>

      <div className="col">
        {Brands.map((brand: any) => (
          <div className="row" key={brand._id}>
            <p>{brand.Name}</p>
            <div>
              <button onClick={() => editCategory(brand._id, brand.Name)}>
                Edit
              </button>
              <button
                onClick={() =>
                  window.confirm('Delete')
                    ? deleteCategory(brand._id)
                    : alert('notdeleted')
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
