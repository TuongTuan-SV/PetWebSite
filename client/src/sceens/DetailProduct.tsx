import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ProductItem } from '../utils/productitem/ProductItem';
import '../components/detailproduct/detailproduct.css';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ProductTabs from '../components/productTabs/ProductTabs';
import { setCart, updateCart } from '../redux/slices/userSlice';
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

  return (
    <>
      <div className="DetailProduct">
        <img src={detailProduct.images[CurrentImg].url} alt=" "></img>
        {detailProduct.images.map((image: any, index: any) => {
          console.log(CurrentImg);
          return (
            <button
              className="imgBtn"
              key={index}
              onClick={() => setCurrentImg(index)}
            >
              {index}
            </button>
          );
        })}
        <div className="box_detail">
          <div style={{ textAlign: 'left' }}>
            {detailProduct.Stocks > 0 ? (
              <span className="InStock">In stock</span>
            ) : (
              <span className="OutOfStock">Out Of Stock</span>
            )}
          </div>
          <div className="row">
            <h2>{detailProduct.Name}</h2>
          </div>
          <div className="detail_content">
            <p style={{ width: '40%' }}>Price </p>
            <p style={{ width: '60%' }}>
              {detailProduct.Price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </div>
          <div className="detail_content">
            <p style={{ width: '40%' }}>Brand</p>
            <p style={{ width: '60%' }}>{detailProduct.Brand}</p>
          </div>

          {/* <div className="detail_content">
            <p style={{ width: '40%' }}>Sold</p>
            <p style={{ width: '60%' }}>{detailProduct.sold}</p>
          </div> */}
          <form className="AddToCart">
            <div className="quantity_wrap">
              {/* <label>Quantity</label> */}
              <div className="quantity buttons_added">
                <button className="minus">
                  <RemoveOutlinedIcon />
                </button>
                <input></input>
                <button className="plus">
                  <AddOutlinedIcon />
                </button>
              </div>
            </div>
            <button className="addCartBtn btn-primary">
              {detailProduct.Stocks > 0 ? (
                <Link
                  to="#"
                  className="cart"
                  onClick={() => addtocart(detailProduct)}
                >
                  <ShoppingBagOutlinedIcon />
                  Add To Cart
                </Link>
              ) : (
                <>
                  <ShoppingBagOutlinedIcon />
                  <Link
                    to="#"
                    className="disabled-link"
                    onClick={() => addtocart(detailProduct)}
                  >
                    Add To Cart
                  </Link>
                </>
              )}
            </button>
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
