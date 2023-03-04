import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ProductItem } from '../utils/productitem/ProductItem';
import '../components/detailproduct/detailproduct.css';
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
  const parmas = useParams();
  const { products } = useAppSelector((state) => state.Products);
  const [detailProduct, setDetailProduct] = useState<any>([]);

  useEffect(() => {
    if (parmas.id) {
      products.forEach((product: any) => {
        if (product._id === parmas.id) setDetailProduct(product);
      });
    }
  }, [parmas.id, products]);

  if (detailProduct.length === 0) return null;
  console.log(detailProduct);
  return (
    <>
      <div className="DetailProduct">
        <img src={detailProduct.image} alt=" "></img>
        <div className="box_detail">
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
          <Link
            to="/cart"
            className="cart"
            // onClick={() => addcart(detailProduct)}
          >
            Buy Now
          </Link>
        </div>
      </div>
      <div className="detail_description">
        <h2>Description</h2>
        <div className="detail_description_content">
          <pre>{detailProduct.Description}</pre>
        </div>
      </div>
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
