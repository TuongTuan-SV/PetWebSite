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
import { Select } from '@mui/material';
import {
  setPoster,
  setSearch,
  setSort,
} from '../../../../redux/slices/blogSlice';
export default function Filter() {
  // const state = useContext(GlobalState);
  // const [categories] = state.categoryAPI.categories;
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.Blog);
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
    dispatch(setSearch(e.target.value));
  };
  const handlePoster = (e: any) => {
    dispatch(setPoster(e.target.value));
  };
  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
      </div>

      <input
        type="text"
        value={search.search}
        placeholder="Enter your blog title!"
        onChange={handleSearch}
      />
      <input
        type="text"
        value={search.Poster}
        placeholder="Enter your poster name!"
        onChange={handlePoster}
        style={{ margin: '5px' }}
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
