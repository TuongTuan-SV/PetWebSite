import React, { useContext, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './sidebar.css';
import {
  RiDashboard2Line,
  RiUserLine,
  RiImageEditFill,
  RiMoneyDollarCircleLine,
} from 'react-icons/ri';
import { MdOutlineCategory } from 'react-icons/md';
import { useAppDispatch } from '../../../hooks';
import { getProducts } from '../../../redux/slices/productSlice';
import Login from '../login/Login';

// import Login from "../../homepage/auth/Login";
// import Header from "../header/Header";
export default function SideBar() {
  const dispatch = useAppDispatch();
  const login: any = localStorage.getItem('firstLogin');
  const admin: any = localStorage.getItem('admin');
  // useEffect(() => {
  //   if (login || admin) {
  //     dispatch(setLogin());
  //     setTimeout(() => {
  //       dispatch(refreshToken()).then(() => {
  //         dispatch(getuser());
  //         dispatch(getHistory());
  //       });
  //     }, 500);
  //   }
  // }, [token]);
  return (
    <>
      {admin ? (
        <div className="Page">
          <div className="SideBar">
            <h3>
              <Link to="/dashboard">
                <RiDashboard2Line className="sidebar_icon" />
                Dashboard
              </Link>
            </h3>
            <h3>
              <Link to="/dashboard/user">
                <RiUserLine className="sidebar_icon" />
                User
              </Link>
            </h3>
            <h3>
              <Link to="/dashboard/order">
                <RiMoneyDollarCircleLine className="sidebar_icon" />
                Order
              </Link>
            </h3>
            <h3>
              <Link to="/dashboard/product">
                <RiImageEditFill className="sidebar_icon" />
                Product
              </Link>
            </h3>
            <h3>
              <Link to="/dashboard/blog">
                <RiImageEditFill className="sidebar_icon" />
                Blog
              </Link>
            </h3>
            <h3>
              <Link to="/dashboard/category">
                <MdOutlineCategory className="sidebar_icon" />
                Category
              </Link>
            </h3>
            <h3>
              <Link to="/dashboard/brand">
                <MdOutlineCategory className="sidebar_icon" />
                Brand
              </Link>
            </h3>
            <h3>
              <Link to="/dashboard/carousel">
                <MdOutlineCategory className="sidebar_icon" />
                Carousel
              </Link>
            </h3>
          </div>
          <div className="Dasboard_Body">
            <Outlet></Outlet>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
