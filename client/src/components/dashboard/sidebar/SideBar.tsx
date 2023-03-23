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
// import Login from "../../homepage/auth/Login";
// import Header from "../header/Header";
export default function SideBar() {
  return (
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
  );
}
