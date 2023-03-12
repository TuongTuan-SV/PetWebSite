import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ProductItem } from '../utils/productitem/ProductItem';
import '../components/detailproduct/detailproduct.css';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ProductTabs from '../components/productTabs/ProductTabs';
import { increment, setCart, updateCart } from '../redux/slices/userSlice';
import { Rating } from '@mui/material';
type product = {
  _id: string;
  Name: string;
  Description: string;
  Category: string;
  Brand: string;
  Price: string;
  image: string;
  images: object;
  category: string;
};

export default function DetailProduct() {
  const dispatch = useAppDispatch();
  const parmas = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const { products } = useAppSelector((state) => state.Products);
  const [detailProduct, setDetailProduct] = useState<any>([]);
  const [CurrentImg, setCurrentImg] = useState<any>(0);

  useEffect(() => {
    if (parmas.id) {
      products.forEach((product: any) => {
        if (product._id === parmas.id) setDetailProduct(product);
      });
    }
  }, [parmas.id, products]);

  const addtocart = (product: any) => {
    dispatch(setCart(product));
    dispatch(updateCart());
  };
  if (detailProduct.length === 0) return null;
  const increment = (e: any) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };
  const decrement = (e: any) => {
    e.preventDefault();
    setQuantity(quantity - 1);
  };
  const ratings = Math.round(
    detailProduct.reviews?.reduce((a: any, b: any) => (a = a + b.rating), 0) /
      detailProduct.reviews.length
  );

  return (
    <>
      <div className="DetailProduct">
        <div className="Img-Container">
          <div className="Current-image">
            <img src={detailProduct.images[CurrentImg].url} alt=" "></img>
          </div>
          {detailProduct.images.length > 1 ? (
            <div className="select-image-container">
              {detailProduct.images.map((item: any, index: any) => {
                return (
                  <div className="select-image" key={index}>
                    <img
                      src={item.url}
                      alt=" "
                      onClick={() => {
                        setCurrentImg(index);
                      }}
                    ></img>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        {/* ====================== Stock ==================================*/}
        <div className="box_detail">
          <div className="detail-info">
            <div className="stock" style={{ textAlign: 'left' }}>
              {detailProduct.Stocks > 0 ? (
                <span className="InStock">In stock</span>
              ) : (
                <span className="OutOfStock">Out Of Stock</span>
              )}
            </div>
            <div className="detail-title">
              <span>{detailProduct.Name}</span>
            </div>
            <span className="detail-price">
              {detailProduct.Price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
            <div className="avage-rating">
              <Rating defaultValue={ratings} precision={0.5} readOnly></Rating>
              <span className="Total-reviews">
                ({detailProduct.reviews.length} Reviews)
              </span>
            </div>
          </div>
          {/* ========== Short Decription =============== */}
          <div className="Short-Decription-Container">
            <p>{detailProduct.Short_Description}</p>
          </div>
          {/*============ Category ======================== */}
          {detailProduct.Category !== ' ' ? (
            <div className="detail-category">
              <p>Categories :</p>
              <p>{detailProduct.Category}</p>
            </div>
          ) : null}

          {/* ====================== Add To Cart =====================*/}
          <form className="AddToCart">
            {/* <label>Quantity</label> */}
            <div className="quantity buttons_added ">
              {detailProduct.Stocks > 0 ? (
                <div className="quantity buttons_added">
                  <button className="minus" onClick={decrement}>
                    <RemoveOutlinedIcon />
                  </button>
                  <input
                    name="quantity"
                    value={quantity}
                    onChange={(e: any) => setQuantity(e.target.value)}
                  ></input>
                  <button className="plus" onClick={increment}>
                    <AddOutlinedIcon />
                  </button>
                </div>
              ) : null}
            </div>

            {detailProduct.Stocks > 0 ? (
              <button className="addCartBtn btn-primary">
                <Link to="#" onClick={() => addtocart(detailProduct)}>
                  <ShoppingBagOutlinedIcon />
                  Add To Cart
                </Link>
              </button>
            ) : (
              <button className="addCartBtn btn-primary disabled">
                <ShoppingBagOutlinedIcon />
                <Link to="#" onClick={() => addtocart(detailProduct)}>
                  Add To Cart
                </Link>
              </button>
            )}
          </form>
        </div>
      </div>
      <ProductTabs detailProduct={detailProduct}></ProductTabs>

      {/* <div className="detail_description">
        <h2>Description</h2>
        <div className="detail_description_content">
          <pre>{detailProduct.Description}</pre>
        </div>
      </div> */}
      <div className="related_product">
        <h2>Related Product</h2>
        <div className="products">
          {products.map((product: any) => {
            return product.Category === detailProduct.Category &&
              product._id !== detailProduct._id ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}
