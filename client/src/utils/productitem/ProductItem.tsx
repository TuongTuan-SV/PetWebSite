import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';

import { current } from '@reduxjs/toolkit';
import { setCart, updateCart } from '../../redux/slices/userSlice';
import './ProductItem.css';

interface Props {
  product: {
    _id: string;
    Name: string;
    Description: string;
    Category: string;
    Brand: string;
    Price: Number;
    image: string;
    images: object;
    category: string;
  };
}

export const ProductItem: React.FC<Props> = ({ product }) => {
  const price = product.Price;
  const dispatch = useAppDispatch();

  const addtocart = (product: any) => {
    dispatch(setCart(product));
    setTimeout(() => {
      dispatch(updateCart());
    }, 500);
  };
  // console.log(product.image);
  return (
    <div className="Product_card">
      <div className="Card_level" id={product.Name}>
        {/* <span className="Card_level_level">
          {product.level != null ? 'Level' : ''}
        </span> */}
        {/* <span className="Card_level_number">{product.level}</span> */}
      </div>
      <img src={product.image} alt="" />

      <div className="product_box">
        <h2 title={product.Name}>{product.Name}</h2>
        <span>
          {product.Price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
        <p>{product.category}</p>
      </div>

      <div className="row_btn">
        <Link id="btn_buy" to="#!" onClick={() => addtocart(product)}>
          Buy
        </Link>
        <Link id="btn_view" to={`/detail/${product._id}`}>
          View
        </Link>
      </div>
    </div>
  );
};
