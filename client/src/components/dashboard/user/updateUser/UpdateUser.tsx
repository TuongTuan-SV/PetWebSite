import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import FormData from 'form-data';

import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setEditUser } from '../../../../redux/slices/userSlice';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: '',
};

export default function UpdateUser() {
  const { AdminUser, EditUser } = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  // const history = useNavigate()
  const parmas = useParams();
  useEffect(() => {
    if (parmas.id) {
      AdminUser.forEach((user: any) => {
        if (user._id === parmas.id) {
          dispatch(setEditUser(user));
          console.log(user);
        }
      });
    }
  }, [parmas.id]);

  const updateUser = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(`/user/${EditUser._id}`, { ...EditUser });

      dispatch(setEditUser(initialState));
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    dispatch(setEditUser({ ...EditUser, [name]: value }));
    console.log(EditUser);
  };

  return (
    <div className="create_product">
      <form onSubmit={updateUser}>
        <div className="row">
          <label htmlFor="firstName">
            First Name <span className="require">*</span>
          </label>
          <input
            type="text"
            name="FirstName"
            id="firstName"
            required
            value={EditUser.FirstName}
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row">
          <label htmlFor="lastName">
            Last Name <span className="require">*</span>
          </label>
          <input
            type="text"
            name="LastName"
            id="lastName"
            required
            value={EditUser.LastName}
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row">
          <label htmlFor="email">
            Email <span className="require">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={EditUser.email}
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row">
          <label htmlFor="password">
            Password <span className="require">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={EditUser.password}
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row">
          <label htmlFor="role">
            Role <span className="require">*</span>
          </label>
          <select
            name="role"
            value={EditUser.role}
            onChange={handleChangeInput}
          >
            <option value="">Select Role</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
          </select>
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
