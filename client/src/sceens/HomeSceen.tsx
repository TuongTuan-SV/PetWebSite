import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../api/config';
import { Carousel } from '../components/carousel/Carousel';
import { useAppSelector, useAppDispatch } from '../hooks';

import { ProductItem } from '../utils/productitem/ProductItem';
type image = {
  src: string;
  link: string;
};
export default function Index() {
  // const dispatch = useAppDispatch();
  const [images, setImages] = useState<image[]>([]);
  const { products, Hotproducts, NewCreateProducts } = useAppSelector(
    (state) => state.Products
  );

  useEffect(() => {
    // console.log(products);
    products.forEach((product: any) => {
      // console.log(product.images[0]);
      setImages((images) => [
        ...images,
        {
          src: product.images[0]?.url,
          link: product.images[0]?.product_id,
        },
      ]);
    });
  }, [products]);

  return (
    <div className="home_page">
      <Carousel images={images} />
      <h2 className="trending">New Product</h2>
      <div className="Products">
        {NewCreateProducts.map((product: any) => (
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
