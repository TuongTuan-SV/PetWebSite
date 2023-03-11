import React, { useContext, useState } from 'react';
import axios from 'axios';
import Loading from '../../utils/loading/Loading';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createProduct, setNewProduct } from '../../redux/slices/productSlice';
import Upload from '../upload/Upload';
import './createproduct.css';
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

export default function CreateProduct() {
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
      <form onSubmit={handleCreateProduct}>
        <div className="row">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            name="Name"
            id="product_id"
            required
            value={Newproduct.Name}
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row Price-Stock-row">
          <div style={{ paddingRight: '10px' }}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="Price"
              id="price"
              required
              value={Newproduct.Price}
              onChange={handleChangeInput}
            ></input>
          </div>
          <div>
            <label htmlFor="Stocks">Stocks</label>
            <input
              type="number"
              name="Stocks"
              id="price"
              required
              value={Newproduct.Stocks}
              onChange={handleChangeInput}
            ></input>
          </div>
        </div>
        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            name="Description"
            id="description"
            required
            value={Newproduct.Description}
            rows={5}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className="row">
          <label htmlFor="short_description">Short Description</label>
          <textarea
            name="Short_Description"
            id="Short_Description"
            required
            value={Newproduct.Short_Description}
            rows={2}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className="row brand">
          <label htmlFor="Brand">Brand</label>
          <select
            name="Brand"
            value={Newproduct.Brand}
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
        <div className="row Category">
          <label htmlFor="Category">Category</label>
          <select
            name="Category"
            value={Newproduct.Category}
            onChange={handleChangeInput}
            className="Select"
          >
            <option value="">Select a Category</option>
            {Categories.map((category: any, index: any) => (
              <option value={category.Name} key={index}>
                {category.Name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create</button>
      </form>
      <div className="upload">
        <Upload />
      </div>
    </div>
  );
}
