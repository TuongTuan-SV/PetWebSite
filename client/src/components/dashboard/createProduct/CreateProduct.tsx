import React, { useContext, useState } from 'react';
import axios from 'axios';
import Loading from '../../../utils/loading/Loading';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  createProduct,
  getAdminProducts,
  getProducts,
  setDiscount,
  setNewCategory,
  setNewProduct,
} from '../../../redux/slices/productSlice';
import Upload from '../../upload/Upload';
import './createproduct.css';
import CategorySelect from './brandSelect/CategorySelect';
import { UploadImg, clearimg } from '../../../redux/slices/uploadSilce';

const initialState = {
  Name: '',
  Description: '',
  Short_Description: '',
  Price: 0,
  Stocks: 0,
  Brand: '',
  Category: [],
  images: [],
  reviews: [],
  Discount: 0,
};

export default function CreateProduct() {
  const { Newproduct, products } = useAppSelector((state) => state.Products);

  const { Brands } = useAppSelector((state) => state.Brands);
  const { images } = useAppSelector((state) => state.Upload);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // const history = useNavigate()
  // console.log(Newproduct);

  const handleCreateProduct = async (e: any) => {
    e.preventDefault();
    if (Newproduct.Price <= 0) {
      return alert('Price need to be more than 0!');
    } else if (Newproduct.Stocks <= 0)
      return alert('Stocks need to be more than 0!');
    else if (
      products.some((item: any) => {
        return item.Name === Newproduct.Name;
      })
    )
      return alert('Product aleardy exists!');
    else {
      const uploadImg = images.map(async (img: any) => {
        await dispatch(UploadImg(img));
        console.log(img);
        return img;
      });

      Promise.all(uploadImg).then(() => {
        dispatch(createProduct(Newproduct))
          .then(() => {
            dispatch(getProducts());
            dispatch(getAdminProducts());
          })
          .then(() => {
            dispatch(setNewProduct(initialState));
            dispatch(clearimg());
            setLoading(false);
            alert('Product Created!');
          });
      });
    }
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    name === 'Name'
      ? containsSpecialChars(value)
        ? alert('Product name can not containt ?&#/%<>')
        : dispatch(setNewProduct({ ...Newproduct, [name]: value }))
      : dispatch(setNewProduct({ ...Newproduct, [name]: value }));
    if (name === 'Price' || name === 'Stocks') {
      if (value >= 0) dispatch(setNewProduct({ ...Newproduct, [name]: value }));
      else dispatch(setNewProduct({ ...Newproduct, [name]: 0 }));
    } else dispatch(setNewProduct({ ...Newproduct, [name]: value }));
  };

  const containsSpecialChars = (str: any) => {
    const specialChars = '?&#/%<>';

    const result = specialChars.split('').some((specialChar: any) => {
      if (str.includes(specialChar)) {
        console.log('ádasdsad');
        return true;
      }

      return false;
    });

    return result;
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
          <label htmlFor="productName">
            Product Name <span className="require">*</span>
          </label>
          <input
            type="text"
            name="Name"
            id="product_id"
            required
            value={Newproduct.Name}
            onChange={handleChangeInput}
          ></input>
        </div>
        <div className="row Price-Stock-row checkout-file">
          <div className="checkout-file">
            <label htmlFor="price">
              Price <span className="require">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              name="Price"
              id="price"
              required
              value={Newproduct.Price}
              onChange={handleChangeInput}
            ></input>
          </div>
          <div className="checkout-file">
            <label htmlFor="Stocks">
              Stocks <span className="require">*</span>
            </label>
            <input
              type="number"
              min="0"
              name="Stocks"
              id="price"
              required
              value={Newproduct.Stocks}
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
              value={Newproduct.Discount}
              onChange={handleDiscount}
            ></input>
          </div>
        </div>
        <div className="row checkout-file">
          <label htmlFor="description">
            Description <span className="require">*</span>
          </label>
          <textarea
            name="Description"
            id="description"
            required
            value={Newproduct.Description}
            rows={3}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className="row checkout-file">
          <label htmlFor="short_description">
            Short Description <span className="require">*</span>
          </label>
          <textarea
            name="Short_Description"
            id="Short_Description"
            required
            value={Newproduct.Short_Description}
            rows={2}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className="row brand checkout-file">
          <label htmlFor="Brand">Brand</label>
          <select
            name="Brand"
            value={Newproduct.Brand}
            className="Select"
            onChange={handleChangeInput}
          >
            <option value="nobrand">Select a Brand</option>
            {Brands.map((brand: any, index: any) => (
              <option value={brand.Name} key={index}>
                {brand.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="row Category checkout-file">
          <label htmlFor="Category">
            Category <span className="require">*</span>
          </label>

          <CategorySelect />
        </div>

        <button type="submit" style={{ marginTop: '30px' }} disabled={loading}>
          Create
        </button>
      </form>
      <div className="upload">
        <Upload />
      </div>
    </div>
  );
}
