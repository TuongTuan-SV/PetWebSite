import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Login from './sceens/Login';
import Product from './sceens/Product';
import Upload from './components/upload/Upload';
import Brand from './components/brand/Brand';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './hooks';
import {
  getProducts,
  getNewtProducts,
  getHotProducts,
} from './redux/slices/productSlice';
import { getBrand } from './redux/slices/brandSlice';
import { getCategory } from './redux/slices/categorySilce';
import { getuser, refreshToken, setLogin } from './redux/slices/userSlice';
import axios from 'axios';

function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.User);

  const login = localStorage.getItem('firstLogin');

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getNewtProducts());
    dispatch(getHotProducts());
    dispatch(getBrand());
    dispatch(getCategory());
    dispatch(refreshToken());
    // console.log(token.accesstoken);
    // dispatch(getuser('adasd'));
  }, [dispatch]);

  useEffect(() => {
    if (login) dispatch(setLogin());
    setTimeout(() => {
      dispatch(getuser());
    }, 500);
  }, [token]);
  return (
    <div className="App">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default App;
