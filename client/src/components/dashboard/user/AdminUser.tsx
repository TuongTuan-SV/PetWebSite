import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiEdit, BiTrash } from 'react-icons/bi';
// import Filter from './filter/Filter';
import axios from 'axios';

import './user.css';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import Filter from './filter/Filter';
import { getalluser } from '../../../redux/slices/userSlice';
export default function Adminuser() {
  const dispatch = useAppDispatch();
  const { AdminUser } = useAppSelector((state) => state.User);
  const [check, setCheck] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [UsersPerPage] = useState(9); //9 Per Page
  useEffect(() => {
    dispatch(getalluser());
  }, []);
  //Get current posts
  const indexOfLastPost = currentPage * UsersPerPage;
  const indexOfFirstPost = indexOfLastPost - UsersPerPage;
  const currentUsers = AdminUser.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(AdminUser.length / UsersPerPage);
  const { token } = useAppSelector((state) => state.User);
  const deleteUser = async (user: any) => {
    try {
      console.log(user._id);
      await axios.delete(`/user/${user._id}`);
      dispatch(getalluser());
    } catch (err: any) {
      alert(err.reponse.data.msg);
    }
  };
  // const deleteMulti = async () => {
  //   if (checkUsers.length > 1) {
  //     try {
  //       if (window.confirm('Delete')) {
  //         checkUsers.forEach((user) => {
  //           deleteUser(user);
  //         });
  //         setCallback(!callback);
  //       }
  //     } catch (err) {
  //       alert(err.reponse.data.msg);
  //     }
  //   } else alert('There is no checked user');
  // };
  // const CheckAll = () => {
  //   users.forEach(async (user) => {
  //     if (checkUsers.includes(user)) {
  //       setCheckUsers((current) =>
  //         current.filter((item) => item._id === user._id)
  //       );
  //     } else {
  //       setCheckUsers((current) => [...current, user]);
  //     }
  //     user.checked = !check;
  //     console.log(user);
  //     await axios.put(`/user/users/${user._id}`, user, {
  //       headers: { Authorization: token },
  //     });
  //   });

  //   setCheck(!check);
  // };
  // const ClickUdate = async (user) => {
  //   user.checked = !user.checked;

  //   if (checkUsers.includes(user)) {
  //     setCheckUsers((current) =>
  //       current.filter((product) => product._id === user._id)
  //     );
  //   } else {
  //     setCheckUsers((current) => [...current, user]);
  //   }
  //   await axios.put(`/user/users/${user._id}`, user, {
  //     headers: { Authorization: token },
  //   });

  //   //  console.log(CheckedProducts);
  //   setCheck(!check);
  // };

  return (
    <div className="admin_user_page">
      <div className="dashboard_btn">
        <button>
          <Link to="/dashboard/user/createuser">
            <h3>Create User </h3>
          </Link>
        </button>
        {/* onClick={deleteMulti} */}
        <button>
          <h3>Delete User </h3>
        </button>
      </div>
      <Filter />
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkall"
                // onChange={CheckAll}
              ></input>
            </th>
            <th>User_id</th>
            <th>Frist Name</th>
            <th>Last Name</th>
            <th>email</th>
            <th>Role</th>
            <th>Create At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user: any) => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  checked={user.checked}
                  // onChange={() => ClickUdate(user)}
                ></input>
              </td>
              <td>{user._id}</td>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/dashboard/user/updateuser/${user._id}`}>
                  <BiEdit size="20px" color="green" />
                </Link>

                <button
                  onClick={() => {
                    window.confirm('Delete') ? deleteUser(user) : null;
                  }}
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
