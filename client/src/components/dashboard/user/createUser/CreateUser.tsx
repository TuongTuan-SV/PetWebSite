import React, { useContext, useState } from 'react';
import axios from 'axios';

import FormData from 'form-data';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setNewUser } from '../../../../redux/slices/userSlice';
import './createuser.css';
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: '',
};

export default function CreateUser() {
  const { NewUser } = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();

  // const history = useNavigate()

  const CreateUser = async (e: any) => {
    e.preventDefault();
    try {
      console.log(NewUser);
      await axios.post('/user/signup', { ...NewUser });

      dispatch(setNewUser(initialState));
    } catch (err: any) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    dispatch(setNewUser({ ...NewUser, [name]: value }));
  };

  // const styleUpload = {
  //   display: image ? "block" : "none",
  // };

  return (
    <div className="create_product">
      <form onSubmit={CreateUser}>
        <div className="row">
          <label htmlFor="firstName">
            First Name <span className="require">*</span>
          </label>
          <input
            type="text"
            name="FirstName"
            id="firstName"
            required
            value={NewUser.FirstName}
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
            value={NewUser.LastName}
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
            value={NewUser.email}
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
            value={NewUser.password}
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row">
          <label htmlFor="role">
            Role <span className="require">*</span>
          </label>
          <select name="role" value={NewUser.role} onChange={handleChangeInput}>
            <option value="">Select Role</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
          </select>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
