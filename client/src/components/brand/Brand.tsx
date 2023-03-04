import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createBrand } from '../../redux/slices/brandSlice';
export default function Brand() {
  const onClick = async () => {
    // dispatch(createBrand('sample B'));
  };

  const dispatch = useAppDispatch();
  useEffect(() => {}, [dispatch]);
  const { Brands } = useAppSelector((state) => state.Brands);
  console.log(Brands);
  return (
    <div>
      <form>
        <input name="Brand Name" type="text"></input>
      </form>
      <p>ádasdsad</p>
      <button onClick={onClick}>click</button>
      {Brands.map((brand: any) => {
        console.log('ádasdsad');
        return <p key={brand.Name}>{brand.Name}</p>;
      })}
    </div>
  );
}
