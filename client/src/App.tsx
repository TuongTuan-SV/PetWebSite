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
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getNewtProducts());
    dispatch(getHotProducts());
    dispatch(getBrand());
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <div className="App">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default App;
