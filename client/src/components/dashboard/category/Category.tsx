import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  createCategory,
  getCategory,
} from '../../../redux/slices/categorySilce';

import { Link } from 'react-router-dom';
import { BiEdit, BiTrash } from 'react-icons/bi';
import Pagination from '../../../utils/pagination/Pagination';
export default function Category() {
  const { Categories } = useAppSelector((state) => state.Categories);
  const [category, setCategory] = useState<any>('');
  const [onEdit, setOnedit] = useState(false);
  const [id, setId] = useState('');
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<any>(1);
  const [productsPerPage] = useState(5); //9 Per Page

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = Categories.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(Categories.length / productsPerPage);
  const deleteCategory = async (id: any) => {
    try {
      const res = await axios.delete(`/api/category/${id}`);
      dispatch(getCategory()).then(() => alert('Deleted!'));
    } catch (err: any) {
      alert(err.response.data.msg);
    }
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
            <th>
              {/* <input
                type="checkbox"
                className="checkall"
                onChange={CheckAll}
              ></input> */}
            </th>
            <th>Title</th>
            <th>Create At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((category: any) => {
            console.log(category.image[0]?.url);
            return (
              <tr key={category._id}>
                {/* <td>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => ClickUdate(item)}
                ></input>
              </td> */}
                <td>
                  <img src={category?.image[0]?.url} alt=" " />
                </td>
                <td>{category.Name}</td>
                <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/dashboard/brand/editbrand/${category._id}`}>
                    <BiEdit size="20px" color="green" />
                  </Link>
                  <button
                    onClick={() =>
                      window.confirm('Delete')
                        ? deleteCategory(category._id)
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
