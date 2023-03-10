import React, { useState } from 'react';
import Menu from './icon/menu.svg';
import Close from './icon/xmark.svg';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import PetsIcon from '@mui/icons-material/Pets';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Login from '../login/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './header.css';
import { setCreateAccount, setLogout } from '../../redux/slices/userSlice';
import axios from 'axios';

export default function Header() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  // console.log(location);
  const [menu, setMenu] = useState(false);
  const { login, User, createAccount } = useAppSelector((state) => state.User);
  const { cart } = User;
  const [active, setAcive] = useState(false);
  let activeClassName = 'active';

  const handleUserTab = () => {
    setAcive(!active);
    if (createAccount) dispatch(setCreateAccount());
  };
  const handleLogout = async (e: any) => {
    dispatch(setLogout());
    await axios.get('user/logout');
    localStorage.clear();
    window.location.href = '/';
  };
  const styleForm: any = {
    display: active ? 'inline' : 'none',
  };
  return (
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
        <ul className="NavItem">
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
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Page
            </NavLink>
          </li>
          <li>
            <NavLink to="/createproduct">createa proudct</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>

          <li>
            <form action="/" method="get" className="SeachBar">
              <div id="header-search-bar">
                <input
                  type="text"
                  id="header-search-text"
                  placeholder="Search Here"
                  name="search"
                  // onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" id="Seachbtn">
                  <BiSearchAlt id="header-search-icon" />
                </button>
              </div>
            </form>
          </li>
          <li className="user-icon" onClick={handleUserTab}>
            <div>
              <Badge>
                <HiOutlineUser size={25}></HiOutlineUser>
              </Badge>
            </div>
          </li>
          <li>
            <ul className="user-form" style={styleForm}>
              {login ? (
                <div>
                  <ul className="user-tab">
                    <li>
                      <Link to="#">profile</Link>
                    </li>
                    <li>
                      <Link to="#">history</Link>
                    </li>
                    {User.role == 0 ? null : (
                      <li>
                        <Link to="#">dashboard</Link>
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
          </li>
          <li>
            <div className="Cart-icon">
              {/* <span style={styleCart}>{cart.length}</span> */}

              <Link to="/cart" className="LogoText">
                <Badge badgeContent={cart ? cart.length : null} color="primary">
                  <AiOutlineShoppingCart size={25}></AiOutlineShoppingCart>
                </Badge>

                {/* <img src={Cart} alt="" width={30}></img> */}
              </Link>
            </div>
          </li>
        </ul>
      </header>
    </div>
  );
}
