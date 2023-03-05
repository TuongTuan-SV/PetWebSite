import React, { useState } from 'react';
import Menu from './icon/menu.svg';
import Close from './icon/xmark.svg';
import { NavLink, Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import PetsIcon from '@mui/icons-material/Pets';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi';
import { useAppSelector } from '../../hooks';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './header.css';

export default function Header() {
  const [menu, setMenu] = useState(false);
  const { login, cart } = useAppSelector((state) => state.User);
  const [UserForm, setUserForm] = useState(false);
  let activeClassName = 'active';

  const handleUser = () => {
    setUserForm(!UserForm);
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
        <ul>
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
            <NavLink to="/login">Blog</NavLink>
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
          <li className="user-icon" onClick={handleUser}>
            <div>
              <Badge>
                <HiOutlineUser size={25}></HiOutlineUser>
              </Badge>
              {UserForm ? (
                <ul className="user-form">
                  {login ? (
                    <div>
                      <li>profile</li>
                      <li>dasboard</li>
                    </div>
                  ) : (
                    <div>
                      <li>Login</li>
                      <li>Signup</li>
                    </div>
                  )}
                </ul>
              ) : null}
            </div>
          </li>
          <li>
            <div className="Cart-icon">
              {/* <span style={styleCart}>{cart.length}</span> */}

              <Link to="/cart" className="LogoText">
                <Badge badgeContent={cart.length} color="primary">
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
