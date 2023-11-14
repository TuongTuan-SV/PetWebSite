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
import { BiEdit, BiTrash } from 'react-icons/bi';
import { getCarousel } from '../../../redux/slices/carouselSlice';

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
  const { carousels } = useAppSelector((state) => state.Carousel);
  const dispatch = useAppDispatch();
  const deleteProduct = async (carousel: any) => {
    try {
      console.log(carousel);
      const destroyImg = carousel.image.map((img: any) => {
        axios.post('/api/destroy', {
          public_id: img.public_id,
        });
      });

      const deleteProduct = axios.delete(`/api/carousel/${carousel._id}`);

      await destroyImg;
      await deleteProduct;
      dispatch(getCarousel());
      alert('Carousel Deleted!');
    } catch (err: any) {
      alert(err.reponse.data.msg);
    }
  };
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
            <th></th>
            <th></th>
            <th>Title</th>
            <th>Create At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carousels?.map((item: any, index: any) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <img src={item.image[0].url} alt=" " />
              </td>
              <td>{item.title}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/dashboard/carousel/editcarousel/${item._id}`}>
                  <BiEdit size="20px" color="green" />
                </Link>
                <button
                  onClick={() =>
                    window.confirm('Delete') ? deleteProduct(item) : null
                  }
                >
                  <BiTrash size="20px" color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} /> */}
    </div>
  );
}
