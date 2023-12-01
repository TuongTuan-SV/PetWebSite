import React, { useState } from 'react';
import Menu from './icon/menu.svg';
import Close from './icon/xmark.svg';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import PetsIcon from '@mui/icons-material/Pets';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Login from '../login/Login';

import './header.css';
import { setCreateAccount, setLogout } from '../../redux/slices/userSlice';
import axios from 'axios';
import { setSearch, getProducts } from '../../redux/slices/productSlice';
import BreadCrumd from '../BreadCrumd/BreadCrumd';

export default function Header() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  // console.log(location);
  const [menu, setMenu] = useState(false);
  const { login, User, createAccount } = useAppSelector((state) => state.User);
  const { search } = useAppSelector((state) => state.Products);
  const { cart } = User;
  const [active, setAcive] = useState(false);
  let activeClassName = 'active';

  const handleUserTab = () => {
    setAcive(!active);
    if (createAccount) dispatch(setCreateAccount());
  };
  const [Search, setsearch] = useState('');
  const handleSearch = (e: any) => {
    dispatch(setSearch(e.target.value));
    dispatch(getProducts());
  };
  // const handleChangeInput = (e: any) => {
  //   dispatch(setSearch(e.target.value.toLowerCase()));
  //   dispatch(getProducts());
  // };
  const handleLogout = async (e: any) => {
    dispatch(setLogout());
    await axios.get('/user/logout');
    localStorage.clear();
    window.location.href = '/';
  };
  const handleAdminLogout = async (e: any) => {
    dispatch(setLogout());
    await axios.get('/user/logout');
    localStorage.clear();
    window.location.href = '/dashboard';
  };
  const styleForm: any = {
    display: active ? 'inline' : 'none',
  };
  const styleMenu = {
    left: menu ? 0 : '-100%',
  };

  return (
    <>
      {location.pathname.includes('dashboard') ? (
        //ADMIN ROUTE
        <div>
          <header>
            <div className="Menu" onClick={() => setMenu(!menu)}>
              <img src={Menu} alt="" width={30}></img>
            </div>

            <div className="Logo">
              <h1>
                
                <NavLink to="/" className="LogoText">
                  Admin
                </NavLink>
              </h1>
            </div>
            <ul className="NavItem" style={styleMenu}>
              <li className="user-icon" onClick={handleUserTab}>
                <div>
                  <Badge>
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 30 }} />
                  </Badge>
                </div>
                <div>
                  {' '}
                  <ul className="user-form" style={styleForm}>
                    {login ? (
                      <div>
                        <ul className="user-tab">
                          <li>
                            <Link to="#">profile</Link>
                          </li>
                          <li>
                            <Link to="dashboard">dashboard</Link>
                          </li>
                          <li className="logout">
                            <button onClick={handleAdminLogout}>Logout</button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Login />
                    )}
                  </ul>
                </div>
              </li>
            </ul>
          </header>
        </div>
      ) : (
        //USER ROUTE
        <div>
          <header>
            <div className="Menu" onClick={() => setMenu(!menu)}>
              <img src={Menu} alt="" width={30}></img>
            </div>

            <div className="Logo">
              <h1>
                <NavLink to="/" className="LogoText">
                  Pet Shop<PetsIcon></PetsIcon>
                </NavLink>
               
              </h1>
            </div>
            <ul className="NavItem" style={styleMenu}>
              <li onClick={() => setMenu(!menu)}>
                <img src={Close} alt="" width="30" className="menu" />
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeClassName : undefined
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="home/shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="home/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="home/contact">Contact</NavLink>
              </li>
              <li>
                <form action="/" method="get" className="SeachBar">
                  <div id="header-search-bar">
                    <input
                      type="text"
                      id="header-search-text"
                      placeholder="Search Here"
                      value={search.search}
                      onChange={handleSearch}
                    />
                    <button type="submit" id="Seachbtn">
                      <SearchOutlinedIcon id="header-search-icon" />
                    </button>
                  </div>
                </form>
              </li>
              <li className="user-icon">
                <div>
                  <Badge onClick={handleUserTab}>
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 30 }} />
                  </Badge>
                </div>
                <div>
                  <ul className="user-form" style={styleForm}>
                    {login ? (
                      <div>
                        <ul className="user-tab">
                          <li>
                          <Link onClick = {()=> setAcive(!active)} to="home/profile">profile</Link>
                          </li>
                          <li>
                            <Link onClick = {()=> setAcive(!active)} to="home/history">history</Link>
                          </li>
                          {User.role == 0 ? null : (
                            <li>
                              <Link onClick = {()=> setAcive(!active)} to="dashboard">dashboard</Link>
                            </li>
                          )}
                          <li className="logout">
                            <button onClick={handleLogout}>Logout</button>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Login />
                    )}
                  </ul>
                </div>
              </li>

              <li>
                <div className="Cart-icon">
                  <Link to="home/cart" className="LogoText">
                    <Badge
                      badgeContent={cart ? cart.length : null}
                      color="primary"
                    >
                      <ShoppingCartOutlinedIcon
                        sx={{ fontSize: 30 }}
                      ></ShoppingCartOutlinedIcon>
                    </Badge>
                  </Link>
                </div>
              </li>
            </ul>
          </header>
        </div>
      )}
    </>
  );
}
