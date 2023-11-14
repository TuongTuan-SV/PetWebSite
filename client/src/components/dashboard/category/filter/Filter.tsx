import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import './filter.css';
import { setSearch, setSort } from '../../../../redux/slices/categorySilce';
export default function Filter() {
  const dispatch = useAppDispatch();
  const { adminsearch, products } = useAppSelector((state) => state.Products);
  const { Brands } = useAppSelector((state) => state.Brands);
  const { Categories, search } = useAppSelector((state) => state.Categories);

  const handleSort = (e: any) => {
    dispatch(setSort(e.target.value));
  };
  const handleSearch = (e: any) => {
    dispatch(setSearch(e.target.value));
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
