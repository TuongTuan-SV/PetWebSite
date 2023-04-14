import React, { useEffect, useState } from 'react';
import CreateBlog from './CreateBlog/CreateBlog';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { deleteBlog, getBlog } from '../../../redux/slices/blogSlice';
import { Link } from 'react-router-dom';
import { BiEdit, BiTrash } from 'react-icons/bi';
import Pagination from '../../../utils/pagination/Pagination';

export default function Blog() {
  const dispatch = useAppDispatch();
  const { Blog } = useAppSelector((state) => state.Blog);
  useEffect(() => {
    dispatch(getBlog());
  }, []);

  const [currentPage, setCurrentPage] = useState<any>(1);
  const [blogPerPage] = useState(5); //9 Per Page

  const indexOfLastPost = currentPage * blogPerPage;
  const indexOfFirstPost = indexOfLastPost - blogPerPage;
  const currentblog = Blog.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(Blog.length / blogPerPage);
  return (
    <div className="admin_product_page">
      <div className="dashboard_btn">
        <button>
          <Link to="/dashboard/blog/createblog">
            <h3>Add blog </h3>
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
            <th>By</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentblog.map((blog: any) => {
            return (
              <tr key={blog._id}>
                {/* <td>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => ClickUdate(item)}
                ></input>
              </td> */}

                <td>
                  <img src={blog?.image?.url} alt=" " />
                </td>
                <td>{blog.Title}</td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>{blog.Poster}</td>
                <td>
                  <Link to={`/dashboard/blog/editblog/${blog._id}`}>
                    <BiEdit size="20px" color="green" />
                  </Link>
                  <button
                    onClick={() =>
                      window.confirm('Delete')
                        ? dispatch(deleteBlog(blog)).then(() => {
                            dispatch(getBlog());
                            alert('Delete');
                          })
                        : null
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
