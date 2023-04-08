import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useActionData } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ProductItem } from '../utils/productitem/ProductItem';
import '../components/detailproduct/detailproduct.css';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ProductTabs from '../components/productTabs/ProductTabs';
import { increment, setCart, updateCart } from '../redux/slices/userSlice';
import { Rating } from '@mui/material';
import CategorySelect from '../components/dashboard/createProduct/brandSelect/CategorySelect';
import { setCategory } from '../redux/slices/productSlice';
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
  const [rating, setRating] = useState<any>();

  useEffect(() => {
    if (parmas.id) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      products.forEach((product: any) => {
        if (product._id === parmas.id) {
          const ratings = Math.round(
            product.reviews?.reduce((a: any, b: any) => (a = a + b.rating), 0) /
              product.reviews.length
          );
          setDetailProduct(product);
          setRating(rating);
        }
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

  const handleLinkClick = (event: any, message: any) => {
    dispatch(setCategory(message));
  };
  const Categories = detailProduct.Category;
  const relate = products.filter((product: any) => {
    if (
      Categories.some((item: any) => product.Category.includes(item)) &&
      product._id !== detailProduct._id
    )
      return product;
  });
  console.log(relate);
  return (
    <>
      <div className="DetailProduct">
        <div className="Img-Container">
          <div className="Current-image">
            <div className="Card_Discount" id={detailProduct.Name}>
              <span className="Card_Discount_Discount">
                {detailProduct.Discount > 0
                  ? `-${detailProduct.Discount}%`
                  : ''}
              </span>
              {/* <span className="Card_level_number">{product.Discount}</span> */}
            </div>
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
              {detailProduct.Discount > 0 ? (
                <div className="priceDiscount">
                  <span className="discountPrice">
                    {(
                      detailProduct.Price -
                      detailProduct.Price * (detailProduct.Discount / 100)
                    ).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </span>
                  <span className="del">
                    {detailProduct.Price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </span>
                </div>
              ) : (
                detailProduct.Price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })
              )}
            </span>
            <div className="avage-rating">
              <Rating defaultValue={rating} precision={0.5} readOnly></Rating>
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
              <span>
                Categories :{' '}
                {detailProduct.Category.map((item: any) => {
                  return (
                    <Link
                      onClick={(event: any) =>
                        handleLinkClick(event, `Category[all]=${item}`)
                      }
                      to="http://127.0.0.1:5173/shop"
                    >
                      {item}
                    </Link>
                  );
                }).reduce((prev: any, curr: any) => [prev, ', ', curr])}
              </span>
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
          {relate.map((product: any) => {
            return <ProductItem key={product._id} product={product} />;
          })}
          {/* {products.map((product: any) => {
            if (product._id !== detailProduct._id)
              detailProduct.Category.map((item: any) => {
                if (item.includes(product.Category))
                  return <ProductItem key={product._id} product={product} />;
              });

            return null;
          })} */}
        </div>
      </div>
    </>
  );
}
