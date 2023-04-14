import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  getAdminProducts,
  setAdminBrand,
  setAdminCategory,
  setAdminSearch,
  setAdminSort,
} from '../../../../redux/slices/productSlice';
import './filter.css';
import { Select } from '@mui/material';
import CategorySelect from './CategorySelect';
import {
  getCategory,
  setSearch,
  setSort,
} from '../../../../redux/slices/categorySilce';
export default function Filter() {
  // const state = useContext(GlobalState);
  // const [categories] = state.categoryAPI.categories;
  const dispatch = useAppDispatch();
  const { adminsearch, products } = useAppSelector((state) => state.Products);
  const { Brands } = useAppSelector((state) => state.Brands);
  const { Categories, search } = useAppSelector((state) => state.Categories);
  // const [category, setCategory] = state.productAPI.category;
  // const [sort, setSort] = state.productAPI.sort;
  // const [search, setSearch] = state.productAPI.search;
  // const [callback, setCallback] = state.productAPI.callback;

  // useEffect(() => {
  //   setCategory("");
  // }, [setCategory]);

  const handleSort = (e: any) => {
    dispatch(setSort(e.target.value));
  };
  const handleSearch = (e: any) => {
    dispatch(setSearch(e.target.value.toLowerCase()));
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
      </div>

      <input
        type="text"
        value={search.search}
        placeholder="Enter your search!"
        onChange={handleSearch}
      />

      <div className="row sort">
        <span>Sort By: </span>
        <select value={search.sort} onChange={handleSort}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
}
