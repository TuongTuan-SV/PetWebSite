import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  setAdminCategory,
  setAdminSearch,
} from '../../../redux/slices/productSlice';
import './filter.css';
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
  const handleCategory = (e: any) => {
    dispatch(setAdminCategory(e.target.value));
    dispatch(setAdminSearch(''));
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        <select name="category">
          <option value="">All Products</option>
          {Categories.map((category: any) => (
            <option value={'category=' + category.Name} key={category.Name}>
              {category.Name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={adminsearch.search}
        placeholder="Enter your search!"
        onChange={(e) => dispatch(setAdminSearch(e.target.value.toLowerCase()))}
      />

      <div className="row sort">
        <span>Sort By: </span>
        {/* <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price: Hight-Low</option>
          <option value="sort=price">Price: Low-Hight</option>
        </select> */}
      </div>
    </div>
  );
}
