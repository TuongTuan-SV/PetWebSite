import React, { useContext, useState, useEffect } from 'react';
import Menu from '../header/icon/menu.svg';
import Close from '../header/icon/xmark.svg';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getProducts,
  setSearch,
  setBrand,
  setCategory,
} from '../../redux/slices/productSlice';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './SideBar.css';
import PriceSlider from './pricesidebar/PriceSlider';

export default function SideBar() {
  const dispatch = useAppDispatch();
  const { products, search } = useAppSelector((state) => state.Products);
  const { Brands } = useAppSelector((state) => state.Brands);
  const { Categories } = useAppSelector((state) => state.Categories);
  const [menu, setMenu] = useState(false);

  const styleMenu = {
    left: menu ? 0 : '-100%',
  };
  // const [price, setPrice] = useState<any>(0);
  useEffect(() => {
    dispatch(getProducts());
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  //   const [level, setLevel] = state.productAPI.level;
  const [sidebar, setSideBar] = useState(false);

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
    dispatch(setSearch({ ...search, [name]: value }));
  };
  // const handlePrice = (e: any) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  //   dispatch(setPrice(value));
  // };
  // const [max, setMax] = useState(0);
  let max = 1000;

  const HandleCategory = (e: any) => {
    dispatch(setCategory(e.target.value));
    dispatch(getProducts());
  };
  const HandleBrand = (e: any) => {
    dispatch(setBrand(e.target.value));
    dispatch(getProducts());
  };
  // const getBackgroundSize = () => {
  //   return { backgroundSize: `${(search.price * 100) / max}% 100% ` };
  // };

  return (
    <div style={{ width: '30%' }}>
      <div className="SideBarMenu" onClick={() => setMenu(!menu)}>
        <KeyboardArrowRightIcon fontSize="large" />
        {/* <img src={Menu} alt="" width={30}></img> */}
      </div>
      <div className="Product_Page_SideBar" style={styleMenu}>
        <div onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width={30} className="menuSidebar" />
        </div>
        <h2>Products ({products.length})</h2>
        <div className="row">
          <PriceSlider />
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
                  checked={
                    search.category.includes('Category[all]=' + category.Name)
                      ? true
                      : false
                  }
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
    </div>
  );
}
