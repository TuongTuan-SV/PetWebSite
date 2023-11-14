import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiEdit, BiTrash } from 'react-icons/bi';
import axios from 'axios';
import Filter from '../filter/Filter';
import Pagination from '../../../utils/pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import './product.css';
import {
  getAdminProducts,
  getProducts,
} from '../../../redux/slices/productSlice';
// import axios from 'axios'

// const initialState = {
//         product_id : '',
//         title : '',
//         price : 0,
//         description : '',
//         brand : '',
//         category : '',
//         difficulty: '',
//         dimensions : '',
//         players : '',
//     }

export default function AdminProduct() {
  const dispatch = useAppDispatch();
  // const state = useContext(GlobalState);
  // const [products, setProducts] = state.productAPI.products;

  // const [token] = state.token;
  const [check, setCheck] = useState(false);
  const [CheckedProducts, setCheckProduct] = useState<Array<object>>([]);
  // const [callback, setCallback] = state.productAPI.callback;
  const { adminproduct, adminsearch } = useAppSelector(
    (state) => state.Products
  );

  const [currentPage, setCurrentPage] = useState<any>(1);
  const [productsPerPage] = useState(5); //9 Per Page

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [adminproduct]);

  //Get current posts
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = adminproduct.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(adminproduct.length / productsPerPage);
  // const [loading, setloading]

  // console.log(adminproduct);
  const CheckAll = () => {
    adminproduct.forEach(async (product: any) => {
      if (CheckedProducts.includes(product)) {
        setCheckProduct((current) =>
          current.filter((item: any) => item._id === product._id)
        );
      } else {
        setCheckProduct((current) => [...current, product]);
      }
      product.checked = !check;
      await axios.put(`/api/products/${product._id}`, product);
    });
    console.log(CheckedProducts);
    setCheck(!check);
  };

  const ClickUdate = async (item: any) => {
    item.checked = !item.checked;
    // const Exists = CheckedProducts.forEach((product) => {
    //   if(product._id === item._id){

    //   }
    // });
    if (CheckedProducts.includes(item)) {
      setCheckProduct((current) =>
        current.filter((product: any) => product._id === item._id)
      );
    } else {
      setCheckProduct((current) => [...current, item]);
    }
    await axios.put(`/api/products/${item._id}`, item);

    console.log(CheckedProducts);
    setCheck(!check);
  };

  const deleteProduct = async (product: any) => {
    try {
      console.log(product._id);
      const destroyImg = product.images.map((img: any) => {
        axios.post('/api/destroy', {
          public_id: img.public_id,
        });
      });
      const deleteProduct = axios.delete(`/api/products/${product._id}`);

      await destroyImg;
      await deleteProduct;
      dispatch(getAdminProducts());
      // dispatch(getAdminProducts());
      // setCallback(!callback);
    } catch (err: any) {
      alert(err.reponse.data.msg);
    }
  };
  const handleMultiDelete = async () => {
    if (CheckedProducts.length > 1) {
      try {
        if (window.confirm('Delete')) {
          CheckedProducts.forEach((product) => {
            deleteProduct(product);
          });
        }
      } catch (err: any) {
        alert(err.reponse.data.msg);
      }
    } else alert('There is no checked product');
  };
  return (
    <div className="admin_product_page">
      <div className="dashboard_btn">
        <button>
          <Link to="/dashboard/product/createproduct">
            <h3>Create Product </h3>
          </Link>
        </button>

        <button onClick={handleMultiDelete}>
          <h3>Delete Product </h3>
        </button>
      </div>
      <Filter />
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Title</th>
            {/* <th>Description</th> */}
            <th>Brand</th>
            <th>Sold</th>
            <th>Stocks</th>
            <th>Price</th>
            <td>Create At</td>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((item: any, index: number) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <img src={item.images[0]?.url} alt=" " />
              </td>

              <td>{item.Name}</td>
              {/* <td style={{maxWidth : '70px', maxHeight : '100px', overflow : 'scroll',whiteSpace : 'nowrap'}}>{item.description}</td> */}
              <td>{item.Brand}</td>
              <td>{item.Sold}</td>
              <th>{item.Stocks}</th>
              <td>
                {item.Price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </td>

              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/dashboard/product/editproduct/${item._id}`}>
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
      <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}
