import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  createBrand,
  getBrand,
  setEditBrand,
  setNewBrand,
} from '../../../redux/slices/brandSlice';
import './brand.css';
import Pagination from '../../../utils/pagination/Pagination';
import { Link } from 'react-router-dom';
import { BiEdit, BiTrash } from 'react-icons/bi';
import Filter from './filter/Filter';

export default function Brand() {
  const dispatch = useAppDispatch();
  const { Brands, Newbrand, EditBrand, search } = useAppSelector(
    (state) => state.Brands
  );

  const [brand, setBrand] = useState<any>('');
  const [onEdit, setOnedit] = useState(false);
  const [id, setId] = useState('');
  const [createbrand, setcreatebrand] = useState(false);

  const [currentPage, setCurrentPage] = useState<any>(1);
  const [BrandPerPage] = useState(5); //9 Per Page

  const indexOfLastPost = currentPage * BrandPerPage;
  const indexOfFirstPost = indexOfLastPost - BrandPerPage;
  const currentBrand = Brands.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(Brands.length / BrandPerPage);
  useEffect(() => {
    dispatch(getBrand());
  }, [search]);
  const handlecreateBrand = (e: any) => {
    e.preventDefault();
    try {
      if (
        Brands.some((item: any) => {
          return item.Name === Newbrand;
        })
      )
        alert('Brand aleary exists!');
      else {
        dispatch(createBrand()).then(() => {
          dispatch(getBrand());
          dispatch(setNewBrand(''));
        });
      }
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };
  const handleupdateBrand = async (e: any) => {
    e.preventDefault();
    try {
      if (
        Brands.some((item: any) => {
          return item.Name === EditBrand;
        })
      )
        alert('Brand aleary exists!');
      else {
        const res = await axios.put(`/api/brands/${id}`, { Name: EditBrand });
        dispatch(getBrand());
      }
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };

  const deleteBrand = async (brand: any) => {
    try {
      const res = await axios.delete(`/api/brands/${brand._id}`);
      console.log(res.data.msg);
      dispatch(getBrand());
    } catch (err: any) {
      alert(err.response.data.msg);
    }
  };
  const handleChange = (e: any) => {
    dispatch(setNewBrand(e.target.value));
  };
  const handleChangeEdit = (e: any) => {
    dispatch(setEditBrand(e.target.value));
  };
  const createstyle: any = {
    display: createbrand ? 'flex' : 'none ',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const Editstyle: any = {
    display: onEdit ? 'flex' : 'none ',
    flexDirection: onEdit ? 'column' : null,
    justifyContent: onEdit ? 'center' : null,
    alignItems: onEdit ? 'center' : null,
  };
  return (
    <div className="admin_product_page">
      <div className="brand_btn ">
        <div>
          <button
            onClick={() => {
              setcreatebrand(!createbrand);
              onEdit ? setOnedit(!onEdit) : null;
            }}
          >
            <h3>Add Brand</h3>
          </button>
          <form
            className="Brand-form"
            onSubmit={handlecreateBrand}
            style={createstyle}
          >
            <input type="text" value={Newbrand} onChange={handleChange}></input>
            <button type="submit">Create Brand</button>
          </form>
        </div>
        <div>
          <button
            onClick={() => {
              setOnedit(!onEdit);
              createbrand ? setcreatebrand(!createbrand) : null;
            }}
          >
            <h3>Update Brand</h3>
          </button>
          <form
            className="Brand-form"
            onSubmit={handleupdateBrand}
            style={Editstyle}
          >
            <input
              type="text"
              value={EditBrand}
              onChange={handleChangeEdit}
            ></input>
            <button type="submit">Update Brand</button>
          </form>
        </div>
      </div>
      <Filter />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Create At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentBrand.map((Brand: any) => {
            return (
              <tr key={Brand._id}>
                <td style={{ textTransform: 'capitalize' }}>{Brand.Name}</td>
                <td>{new Date(Brand.createdAt).toLocaleDateString()}</td>

                <td>
                  <BiEdit
                    size="20px"
                    color="green"
                    onClick={() => {
                      setOnedit(!onEdit);
                      createbrand ? setcreatebrand(!createbrand) : null;
                      setId(Brand._id);
                      dispatch(setEditBrand(Brand.Name));
                    }}
                  />

                  <button
                    onClick={() =>
                      window.confirm('Delete')
                        ? deleteBrand(Brand)
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
