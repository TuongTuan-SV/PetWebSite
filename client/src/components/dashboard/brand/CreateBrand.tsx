import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  createBrand,
  getBrand,
  setNewBrand,
} from '../../../redux/slices/brandSlice';

export default function CreateBrand() {
  const dispatch = useAppDispatch();
  const { Newbrand, Brands } = useAppSelector((state) => state.Brands);

  const handleChange = (e: any) => {
    dispatch(setNewBrand(e.target.value));
  };
  const handlecreateBrand = () => {
    try {
      if (
        Brands.some((item: any) => {
          return item.Name === Newbrand;
        })
      )
        alert('Brand aleary exists!');
      else {
        dispatch(createBrand()).then(() => {
          dispatch(getBrand());
          dispatch(setNewBrand(''));
        });
      }
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };
  return (
    <div>
      <form
        onSubmit={handlecreateBrand}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <input type="text" value={Newbrand} onChange={handleChange}></input>
        <button type="submit">Create Brand</button>
      </form>
    </div>
  );
}
