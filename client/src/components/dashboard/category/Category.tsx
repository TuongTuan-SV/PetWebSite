import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  createCategory,
  getCategory,
} from '../../../redux/slices/categorySilce';
import { Link, useNavigate } from 'react-router-dom';
import { BiEdit, BiTrash } from 'react-icons/bi';
import Pagination from '../../../utils/pagination/Pagination';
import Filter from './filter/Filter';
import { setAdminCategory } from '../../../redux/slices/productSlice';

export default function Category() {
  const { products } = useAppSelector((state) => state.Products);
  const { Categories, search } = useAppSelector((state) => state.Categories);
  const [category, setCategory] = useState<any>('');
  const [onEdit, setOnedit] = useState(false);
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [search]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [categoryPerPage] = useState(5); //9 Per Page

  const indexOfLastPost = currentPage * categoryPerPage;
  const indexOfFirstPost = indexOfLastPost - categoryPerPage;
  const currentCategory = Categories.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(Categories.length / categoryPerPage);
  const deleteCategory = async (category: any) => {
    try {
      const destroyImg = category.image.map((img: any) => {
        axios.post('/api/destroy', {
          public_id: img.public_id,
        });
      });

      const deleteProduct = axios.delete(`/api/category/${category._id}`);

      await destroyImg;
      await deleteProduct;
      dispatch(getCategory()).then(() => alert('Deleted!'));
    } catch (err: any) {
      alert(err.response.data.msg);
    }
  };

  const routeChange = (Name: any) => {
    const Category: object = [`Category[all]=${Name}`];
    dispatch(setAdminCategory(Category));
    navigate('/dashboard/product');
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
      <Filter />
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Title</th>
            <th>Create At</th>
            <th>Products</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentCategory.map((category: any, index: any) => {
            return (
              <tr key={category._id}>
                <td>{index + 1}</td>

                <td
                  onClick={() => {
                    routeChange(category.Name);
                  }}
                >
                  <img src={category?.image[0]?.url} alt=" " />
                </td>
                <td
                  onClick={() => {
                    routeChange(category.Name);
                  }}
                >
                  {category.Name}
                </td>
                <td
                  onClick={() => {
                    routeChange(category.Name);
                  }}
                >
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
                <td
                  onClick={() => {
                    routeChange(category.Name);
                  }}
                >
                  {
                    products.filter((item: any) => {
                      if (item.Category.includes(category.Name)) return item;
                    }).length
                  }
                </td>
                <td>
                  <Link to={`/dashboard/category/editcategory/${category._id}`}>
                    <BiEdit size="20px" color="green" />
                  </Link>
                  <button
                    onClick={() =>
                      window.confirm('Delete') ? deleteCategory(category) : null
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
