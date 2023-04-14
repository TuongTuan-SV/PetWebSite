import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createBrand, getBrand } from '../../../redux/slices/brandSlice';
import './brand.css';
import Pagination from '../../../utils/pagination/Pagination';
import { Link } from 'react-router-dom';
import { BiEdit, BiTrash } from 'react-icons/bi';

export default function Brand() {
  const dispatch = useAppDispatch();
  const { Brands } = useAppSelector((state) => state.Brands);
  const [brand, setBrand] = useState<any>('');
  const [onEdit, setOnedit] = useState(false);
  const [id, setId] = useState('');

  const [currentPage, setCurrentPage] = useState<any>(1);
  const [BrandPerPage] = useState(5); //9 Per Page

  const indexOfLastPost = currentPage * BrandPerPage;
  const indexOfFirstPost = indexOfLastPost - BrandPerPage;
  const currentBrand = Brands.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(Brands.length / BrandPerPage);
  const handlecreateBrand = async (e: any) => {
    e.preventDefault();
    try {
      if (
        Brands.some((item: any) => {
          return item.Name === brand;
        })
      )
        alert('Brand aleary exists!');
      else {
        if (onEdit) {
          const res = await axios.put(`/api/brands/${id}`, { Name: brand });
          console.log(res);
        } else {
          // const res = await axios.post(
          //   '/api/category',
          //   { name: category },
          //   {
          //     headers: { Authorization: token },
          //   }
          // );
          // console.log(res);
          dispatch(createBrand(brand)).then(() => dispatch(getBrand()));
        }
        setOnedit(false);
        setBrand('');
      }
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id: any, name: any) => {
    setId(id);
    setBrand(name);
    setOnedit(true);
  };

  const deleteCategory = async (id: any) => {
    try {
      const res = await axios.delete(`/api/brands/${id}`);
      console.log(res.data.msg);
      dispatch(getBrand());
    } catch (err: any) {
      alert(err.response.data.msg);
    }
  };

  const routeChange = (Name: any) => {
    const Category: object = [`Category[all]=${Name}`];
    // dispatch(setAdminCategory(Category));
    // navigate('/dashboard/product');
  };

  return (
    <div className="admin_product_page">
      <div className="dashboard_btn">
        <button>
          <Link to="/dashboard/category/createcategory">
            <h3>Add Category </h3>
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
            <th>Title</th>
            <th>Create At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentBrand.map((Brand: any) => {
            return (
              <tr
                key={Brand._id}
                onClick={() => {
                  routeChange(Brand.Name);
                }}
              >
                {/* <td>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => ClickUdate(item)}
                ></input>
              </td> */}

                <td>{Brand.Name}</td>
                <td>{new Date(Brand.createdAt).toLocaleDateString()}</td>

                <td>
                  <Link to={`/dashboard/brand/editbrand/${Brand._id}`}>
                    <BiEdit size="20px" color="green" />
                  </Link>
                  <button
                    onClick={() =>
                      window.confirm('Delete')
                        ? deleteCategory(Brand)
                        : alert('notdeleted')
                    }
                  >
                    <BiTrash size="20px" color="red" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}
