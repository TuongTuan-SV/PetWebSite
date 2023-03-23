import React, { useContext, useState } from 'react';
import axios from 'axios';
import Loading from '../../../utils/loading/Loading';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  createProduct,
  setNewProduct,
} from '../../../redux/slices/productSlice';

import UploadCarousel from '../../upload/UploadCarousel';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';

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
  const { image } = useAppSelector((state) => state.Carousel);
  const dispatch = useAppDispatch();

  // };

  return (
    <div className="admin_product_page">
      <div className="dashboard_btn">
        <button>
          <Link to="/dashboard/carousel/createcarousel">
            <h3>Add Carousel </h3>
          </Link>
        </button>

        {/* <button onClick={handleMultiDelete}>
          <h3>Delete Product </h3>
        </button> */}
      </div>
      {/* <Filter /> */}
      <table>
        <thead>
          <tr>
            <th>
              {/* <input
                type="checkbox"
                className="checkall"
                onChange={CheckAll}
              ></input> */}
            </th>
            <th></th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {image?.map((item: any) => (
            <tr key={item._id}>
              {/* <td>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => ClickUdate(item)}
                ></input>
              </td> */}
              <td>
                <img src={item.image[0].url} alt=" " />
              </td>

              <td>
                <Link to={`/dashboard/product/editproduct/${item._id}`}>
                  <BiEdit size="20px" color="green" />
                </Link>
                {/* <button
                  onClick={() =>
                    window.confirm('Delete')
                      ? deleteProduct(item)
                      : alert('notdeleted')
                  }
                >
                  <BiTrash size="20px" color="red" />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} /> */}
    </div>
  );
}
