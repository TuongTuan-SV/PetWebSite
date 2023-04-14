import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './hooks';
import {
  getProducts,
  getNewtProducts,
  getHotProducts,
} from './redux/slices/productSlice';
import { getBrand } from './redux/slices/brandSlice';
import { getCategory } from './redux/slices/categorySilce';
import {
  getuser,
  refreshToken,
  setLogin,
  getHistory,
  getalluser,
} from './redux/slices/userSlice';
import { getAllOrder } from './redux/slices/orderSlice';
import { getCarousel } from './redux/slices/carouselSlice';
import { getBlog } from './redux/slices/blogSlice';

function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.User);
  const login = localStorage.getItem('firstLogin');
  const admin = localStorage.getItem('admin');
  const location = useLocation();
  useEffect(() => {
    //GET BRAND
    dispatch(getBrand());
    //GET CATEGORY
    dispatch(getCategory());
    dispatch(getalluser());
    dispatch(getCarousel());
    dispatch(getAllOrder());
    // console.log(token.accesstoken);
    dispatch(getBlog());
    //Get PRODUCT
    dispatch(getProducts());
    dispatch(getNewtProducts());
    dispatch(getHotProducts());
  }, [dispatch]);

  useEffect(() => {
    if (login || admin) {
      dispatch(setLogin());
      setTimeout(() => {
        dispatch(refreshToken()).then(() => {
          dispatch(getuser());
          dispatch(getHistory());
        });
      }, 500);
    }
  }, [token]);
  return (
    <div className="App">
      <Header></Header>
      <Outlet />
      {location.pathname.includes('dashboard') ? null : <Footer></Footer>}
    </div>
  );
}

export default App;
