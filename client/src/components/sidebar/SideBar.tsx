import React, { useContext, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getProducts,
  setSearch,
  setBrand,
  setCategory,
  setPrice,
} from '../../redux/slices/productSlice';
import './SideBar.css';

export default function SideBar() {
  const dispatch = useAppDispatch();
  const { products, search } = useAppSelector((state) => state.Products);
  const { Brands } = useAppSelector((state) => state.Brands);
  const { Categories } = useAppSelector((state) => state.Categories);
  // const [price, setPrice] = useState<any>(0);

  //   const [level, setLevel] = state.productAPI.level;
  const [sidebar, setSideBar] = useState(false);

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    dispatch(setSearch({ ...search, [name]: value }));
    dispatch(getProducts());
  };
  // const [max, setMax] = useState(0);
  let max = 1000;

  //   const HandleDiff = (e) => {
  //     if (level.includes(e.target.value)) {
  //       // console.log(level);
  //       setLevel((current) => current.filter((diff) => diff !== e.target.value));
  //     } else {
  //       setLevel((current) => [...current, e.target.value]);
  //       // console.log(diffFilter);
  //     }
  //   };
  const HandleCategory = (e: any) => {
    dispatch(setCategory(e.target.value));
    dispatch(getProducts());
  };
  const HandleBrand = (e: any) => {
    dispatch(setBrand(e.target.value));
    dispatch(getProducts());
  };
  const getBackgroundSize = () => {
    return { backgroundSize: `${(search.price * 100) / max}% 100% ` };
  };
  const styleSideBar = {
    left: sidebar ? 0 : '-100%',
  };
  return (
    <div className="Product_Page_SideBar">
      <h2>Products ({products.length})</h2>
      <div className="row">
        <h4>Price</h4>
        <div className="PriceSlider">
          <p>0</p>
          <input
            className="PriceRange"
            name="price"
            type="range"
            min="0"
            max={max}
            step={10}
            onChange={handleChangeInput}
            // ${getBackgroundSize()} `
            style={getBackgroundSize()}
            value={search.price}
          ></input>
          <span id="PriceFilterValue">{search.price}</span>
        </div>
      </div>

      <div className="line"></div>
      <div className="row">
        <h4>Category</h4>
        {Categories.map((category: any) => {
          return (
            <label className="form-control CheckBox" key={category._id}>
              <input
                type="checkbox"
                value={'Category[all]=' + category.Name}
                onChange={HandleCategory}
              ></input>
              {category.Name}
            </label>
          );
        })}
      </div>
      <div className="line"></div>
      <div className="row">
        <h4>Brand </h4>
        {Brands.map((brand: any) => (
          <label className="form-control CheckBox" key={brand._id}>
            <input
              name="brand"
              type="checkbox"
              value={'Brand=' + brand.Name}
              onChange={HandleBrand}
            ></input>
            {brand.Name}
          </label>
        ))}
      </div>
      <div className="line"></div>
    </div>
  );
}
