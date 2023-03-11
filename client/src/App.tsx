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
} from './redux/slices/userSlice';

function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.User);
  const login = localStorage.getItem('firstLogin');
  const location = useLocation();
  useEffect(() => {
    //GET BRAND
    dispatch(getBrand());
    //GET CATEGORY
    dispatch(getCategory());

    // console.log(token.accesstoken);
    // dispatch(getuser('adasd'));
    //Get PRODUCT
    dispatch(getProducts());
    dispatch(getNewtProducts());
    dispatch(getHotProducts());
  }, [dispatch]);

  useEffect(() => {
    if (login) {
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
      <Footer></Footer>
    </div>
    // <>
    //   {location.pathname === '/lostpassword' ? (
    //     <div className="App">
    //       <Header></Header>
    //       <Outlet />
    //       <Footer></Footer>
    //     </div>
    //   ) : (
    //     <div className="App">
    //       <Header></Header>
    //       <Outlet />
    //       <Footer></Footer>
    //     </div>
    //   )}
    // </>
  );
}

export default App;
