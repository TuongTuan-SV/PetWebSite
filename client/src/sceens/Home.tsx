import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../api/config';
import { Carousel } from '../components/carousel/Carousel';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setToken } from '../redux/slices/userSlice';
import { ProductItem } from '../utils/productitem/ProductItem';
type image = {
  src: string;
  link: string;
};
export default function Index() {
  const dispatch = useAppDispatch();
  const [images, setImages] = useState<image[]>([]);
  const { products, Hotproducts, NewProducts } = useAppSelector(
    (state) => state.Products
  );

  useEffect(() => {
    // console.log(products);
    products.forEach((product: any) => {
      // console.log(product.images[0]);
      setImages((images) => [
        ...images,
        {
          src: product.images[0],
          link: product._id,
        },
      ]);
    });
  }, [products]);

  return (
    <div className="home_page">
      <Carousel images={images} />
      <h2 className="trending">New Product</h2>
      <div className="Products">
        {NewProducts.map((product: any) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      <h2 className="trending">Today's Popular Items</h2>
      <div className="Products">
        {Hotproducts.map((product: any) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
