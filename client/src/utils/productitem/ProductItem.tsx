import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';

import { current } from '@reduxjs/toolkit';
import { setCart, updateCart } from '../../redux/slices/userSlice';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import { Rating } from '@mui/material';
import './ProductItem.css';
import Product from '../../sceens/ProductSceen';
interface Image {
  public_id: string;
  url: string;
}
// interface Props {
//   product: {
//     _id: string;
//     Name: string;
//     Description: string;
//     Short_Description: string;
//     Category: string;
//     Brand: string;
//     Price: number;
//     Stocks: number;
//     images: Array<Image>;
//     category: string;
//     Discount: number;
//     reviews: object;
//   };
// }

export const ProductItem = (Props: any) => {
  const dispatch = useAppDispatch();
  const product = Props.product;
  // console.log(product.images[0]?.url);
  const addtocart = (product: any) => {
    dispatch(setCart(product));
    dispatch(updateCart());
  };
  const ratings = Math.round(
    product.reviews?.reduce((a: any, b: any) => (a = a + b.rating), 0) /
      product.reviews.length
  );
  // console.log(product.image);
  return (
    <div className="Product_card">
      <div className="Product_card_imgContainer">
        <div className="Card_Discount" id={product.Name}>
          <span className="Card_Discount_Discount">
            {product.Discount > 0 ? `-${product.Discount}%` : ''}
          </span>
          {/* <span className="Card_level_number">{product.Discount}</span> */}
        </div>
        <img src={product.images[0]?.url} alt="" />

        <div className="Product_card_view tooltip">
          <span className="tooltiptext">View Product</span>
          <Link to={`/detail/${product._id}`}>
            <ZoomInOutlinedIcon style={{ fontSize: '25' }}></ZoomInOutlinedIcon>
          </Link>
        </div>
        <button className="addCartBtn btn-primary Product_card_addtocart">
          <ShoppingBagOutlinedIcon />
          <Link to="#" onClick={() => addtocart(product)}>
            Add To Cart
          </Link>
        </button>
        {/* <div>
          <Link id="btn_buy" to="#!" onClick={() => addtocart(product)}>
            Buy
          </Link>
        </div> */}
      </div>

      <div className="product_box">
        {product.Discount > 0 ? (
          <div className="priceDiscount">
            <span className="discountPrice">
              {(
                product.Price -
                product.Price * (product.Discount / 100)
              ).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
            <span className="del">
              {product.Price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </div>
        ) : (
          <span className="price">
            {product.Price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
        )}
        <Link to={`/detail/${product._id}`}>
          <span title={product.Name} className="product_item_Name">
            {product.Name}
          </span>
        </Link>

        {product.reviews.length > 0 ? (
          <div className="avage-rating card-rating">
            <Rating defaultValue={ratings} precision={0.5} readOnly></Rating>
            <span className="Total-reviews">
              ({product.reviews.length} Reviews)
            </span>
          </div>
        ) : null}
      </div>

      {/* <div className="row_btn">
        <Link id="btn_buy" to="#!" onClick={() => addtocart(product)}>
          Buy
        </Link>
        <Link id="btn_view" to={`/detail/${product._id}`}>
          View
        </Link>
      </div> */}
    </div>
  );
};
