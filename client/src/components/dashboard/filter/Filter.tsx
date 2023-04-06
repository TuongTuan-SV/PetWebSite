import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getAdminProducts,
  setAdminBrand,
  setAdminCategory,
  setAdminSearch,
  setAdminSort,
} from '../../../redux/slices/productSlice';
import './filter.css';
import { Select } from '@mui/material';
import CategorySelect from './CategorySelect';
export default function Filter() {
  // const state = useContext(GlobalState);
  // const [categories] = state.categoryAPI.categories;
  const dispatch = useAppDispatch();
  const { adminsearch, products } = useAppSelector((state) => state.Products);
  const { Brands } = useAppSelector((state) => state.Brands);
  const { Categories } = useAppSelector((state) => state.Categories);
  // const [category, setCategory] = state.productAPI.category;
  // const [sort, setSort] = state.productAPI.sort;
  // const [search, setSearch] = state.productAPI.search;
  // const [callback, setCallback] = state.productAPI.callback;

  // useEffect(() => {
  //   setCategory("");
  // }, [setCategory]);

  const handleBrand = (e: any) => {
    dispatch(setAdminBrand(e.target.value));

    dispatch(getAdminProducts());
  };
  const handleSort = (e: any) => {
    dispatch(setAdminSort(e.target.value));

    dispatch(getAdminProducts());
  };
  const handleSearch = (e: any) => {
    dispatch(setAdminSearch(e.target.value.toLowerCase()));
    dispatch(getAdminProducts());
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        <select name="Brand" onChange={handleBrand}>
          <option value="">All Products</option>
          {Brands.map((brand: any) => (
            <option value={'Brand[all]=' + brand.Name} key={brand.Name}>
              {brand.Name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={adminsearch.search}
        placeholder="Enter your search!"
        onChange={handleSearch}
      />
      <div className="row">
        <CategorySelect />
        {/* {Categories.map((category: any) => {
          return (
            <label className="form-control " key={category._id}>
              <input
                type="checkbox"
                value={'Category[all]=' + category.Name}
                onChange={handleCategory}
              ></input>
              {category.Name}
            </label>
          );
        })} */}
      </div>
      <div className="row sort">
        <span>Sort By: </span>
        <select value={adminsearch.sort} onChange={handleSort}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-Price">Price: Hight-Low</option>
          <option value="sort=Price">Price: Low-Hight</option>
        </select>
      </div>
    </div>
  );
}
