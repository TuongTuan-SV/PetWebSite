import React, { useContext, useState } from 'react';
import axios from 'axios';
import Loading from '../../../utils/loading/Loading';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  createProduct,
  setNewProduct,
} from '../../../redux/slices/productSlice';

import UploadCarousel from '../../upload/UploadCarousel';

// const initialState = {
//   Name: '',
//   Description: '',
//   Price: 0,
//   Socks: 0,
//   Brand: '',
//   Category: '',
//   images: [],
//   reviews: [],
// };

export default function CreateCarousel() {
  const { Newproduct } = useAppSelector((state) => state.Products);
  const [loading, setLoading] = useState(false);
  const { Brands } = useAppSelector((state) => state.Brands);
  const { Categories } = useAppSelector((state) => state.Categories);
  const { images } = useAppSelector((state) => state.Upload);
  const dispatch = useAppDispatch();
  // const history = useNavigate()
  // console.log(Newproduct);
  const handleCreateProduct = (e: any) => {
    e.preventDefault();
    dispatch(createProduct(Newproduct));
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    dispatch(setNewProduct({ ...Newproduct, [name]: value }));
  };

  // const handleSelectInput = (e: any) => {};
  // const styleUpload = {
  //   display: images ? 'block' : 'none',
  // };

  return (
    <div className="create_product">
      <div className="upload">
        <UploadCarousel />
      </div>
    </div>
  );
}
