import React, { useContext, useEffect, useState } from 'react';
import par from 'axios';
import Loading from '../../../utils/loading/Loading';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  createProduct,
  editProduct,
  getAdminProducts,
  getProducts,
  setDiscount,
  setEditproduct,
  setNewCategory,
  setNewProduct,
} from '../../../redux/slices/productSlice';
import Upload from '../../upload/Upload';

import CategorySelect from './editBrandSelect/CategorySelect';
import { useParams } from 'react-router-dom';
import EditUpload from '../../upload/Editupload';
import {
  DeleteImg,
  EditDeleteImg,
  EditUploadImg,
  UploadImg,
  clearEditimg,
  subtractimg,
} from '../../../redux/slices/uploadSilce';

export default function EditProduct() {
  const { Newproduct } = useAppSelector((state) => state.Products);
  const { products, Editproduct } = useAppSelector((state) => state.Products);
  const { Brands } = useAppSelector((state) => state.Brands);
  const { editUploadedimage, editImgs, tmp } = useAppSelector(
    (state) => state.Upload
  );
  const parmas = useParams();
  const dispatch = useAppDispatch();
  // const history = useNavigate()
  // console.log(product);

  useEffect(() => {
    if (parmas.id) {
      products.forEach((product: any) => {
        if (product._id === parmas.id) dispatch(setEditproduct(product));
      });
    }
  }, [parmas.id, products]);

  const handleCreateProduct = async (e: any) => {
    e.preventDefault();
    if (Editproduct.Price <= 0) {
      return alert('Price need to be more than 0!');
    } else if (
      products.some((item: any) => {
        if (item.Name === Editproduct.Name && item._id !== Editproduct._id)
          return item.Name === Editproduct.Name;
      })
    )
      return alert('Product aleardy exists!');
    else {
      const deletetmp = tmp.map(async (img: any) => {
        await dispatch(EditDeleteImg(img.public_id));
      });
      const uploadNewimg = editImgs.map(async (img: any) => {
        if (typeof img.public_id === 'object') {
          console.log('addimg');
          await dispatch(EditUploadImg(img.public_id)).then(() =>
            dispatch(subtractimg())
          );
        }
      });

      Promise.all(uploadNewimg).then(() => {
        dispatch(editProduct(Editproduct))
          .then(() => {
            dispatch(getProducts());
            dispatch(getAdminProducts());
          })
          .then(() => {
            alert('Product Updated!');
          });
      });
      deletetmp;
    }
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    if (name === 'Price' || name === 'Stocks') {
      if (value >= 0)
        dispatch(setEditproduct({ ...Editproduct, [name]: value }));
    } else dispatch(setEditproduct({ ...Editproduct, [name]: value }));
  };

  const handleDiscount = (e: any) => {
    const { name, value } = e.target;
    dispatch(setDiscount(value));
  };
  // const handleSelectInput = (e: any) => {};
  // const styleUpload = {
  //   display: images ? 'block' : 'none',
  // };

  return (
    <div className="create_product">
      <form onSubmit={handleCreateProduct}>
        <div className="row checkout-file">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            name="Name"
            id="product_id"
            required
            value={Editproduct.Name}
            onChange={handleChangeInput}
          ></input>
        </div>
        <div className="row Price-Stock-row checkout-file">
          <div className="checkout-file">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              min="0"
              step="0.01"
              name="Price"
              id="price"
              required
              value={Editproduct.Price}
              onChange={handleChangeInput}
            ></input>
          </div>
          <div className="checkout-file">
            <label htmlFor="Stocks">Stocks</label>
            <input
              type="number"
              min="0"
              name="Stocks"
              id="stocks"
              required
              value={Editproduct.Stocks}
              onChange={handleChangeInput}
            ></input>
          </div>
          <div style={{ paddingRight: '10px' }} className="checkout-file">
            <label htmlFor="discount">Discount</label>
            <input
              type="Number"
              min="0"
              max="100"
              name="Discount"
              id="Discount"
              required
              value={Editproduct.Discount}
              onChange={handleDiscount}
            ></input>
          </div>
        </div>
        <div className="row checkout-file">
          <label htmlFor="description">Description</label>
          <textarea
            name="Description"
            id="description"
            required
            value={Editproduct.Description}
            rows={3}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className="row checkout-file">
          <label htmlFor="short_description">Short Description</label>
          <textarea
            name="Short_Description"
            id="Short_Description"
            required
            value={Editproduct.Short_Description}
            rows={2}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className="row brand checkout-file">
          <label htmlFor="Brand">Brand</label>
          <select
            name="Brand"
            value={Editproduct.Brand}
            className="Select"
            onChange={handleChangeInput}
          >
            <option value="">Select a Brand</option>
            {Brands.map((brand: any, index: any) => (
              <option value={brand.Name} key={index}>
                {brand.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="row Category checkout-file">
          <label htmlFor="Category">Category</label>
          {/* <select
            name="Category"
            value={product.Category}
            onChange={handleChangeInput}
            
            className="Select"
          >
            <option value="">Select a Category</option>
            {Categories.map((category: any, index: any) => (
              <option value={category.Name} key={index}>
                {category.Name}
              </option>
            ))}
          </select> */}
          <CategorySelect />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>
          Upadate
        </button>
      </form>
      <div className="upload">
        <EditUpload />
      </div>
    </div>
  );
}
