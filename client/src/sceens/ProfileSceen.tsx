import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import axios from 'axios';
import { setUser } from '../redux/slices/userSlice';
import { Link } from 'react-router-dom';

export default function ProfileSceen() {
  const dispatch = useAppDispatch();
  const { User } = useAppSelector((state) => state.User);
  const updateUser = async (e: any) => {
    e.preventDefault();

    try {
      window.confirm('Update user ')
        ? await axios.put(`/user/${User._id}`, { ...User })
        : null;
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    dispatch(setUser({ ...User, [name]: value }));
  };
  return (
    <>
      {User ? (
        <div style={{ marginBottom: '10px' }}>
          <div className="create_product">
            <form onSubmit={updateUser}>
              <div className="row">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="FirstName"
                  id="firstName"
                  required
                  value={User.FirstName}
                  onChange={handleChangeInput}
                ></input>
              </div>

              <div className="row">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="LastName"
                  id="lastName"
                  required
                  value={User.LastName}
                  onChange={handleChangeInput}
                ></input>
              </div>

              <div className="row">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={User.email}
                  onChange={handleChangeInput}
                ></input>
              </div>

              <button type="submit">Update</button>
              <Link to="changepsw">
                {' '}
                <button type="submit">Change Password</button>
              </Link>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
