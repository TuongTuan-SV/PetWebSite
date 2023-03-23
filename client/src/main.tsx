import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux/es/exports';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './utils/NotFount';
import Upload from './components/upload/Upload';
import Login from './sceens/LoginSceen';
import Signup from './sceens/SignupSceen';
import Home from './sceens/HomeSceen';
import DetailProduct from './sceens/DetailProductSceen';
import Product from './sceens/ProductSceen';
import Cart from './sceens/CartSceen';
import CreataProduct from './sceens/CreataProductSceen';
import CheckOut from './components/CartCheckOut/CheckOut';
import History from './sceens/HistorySceen';
import OrderDetailSceen from './sceens/OrderDetailSceen';
import LostPwdSceen from './sceens/LostPwdSceen';
import DashboardSceen from './sceens/DashboardSceen';
import AdminProduct from './components/dashboard/product/AdminProduct';
import Dashboard from './components/dashboard/Dashboard/Dashboard';
import Order from './components/dashboard/order/Order';
import OrderDetail from './components/dashboard/order/Orderdetail';
import Category from './components/dashboard/category/Category';
import Brand from './components/dashboard/brand/brand';
import CarouselSceen from './sceens/CarouselSceen';
import CreateCarousel from './components/dashboard/carousel/CreateCarousel';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },

      {
        path: 'upload',
        element: <Upload />,
      },
      {
        path: 'history',
        element: <History />,
      },
      {
        path: 'history/:id',
        element: <OrderDetailSceen />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'lostpassword',
        element: <LostPwdSceen />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'detail/:id',
        element: <DetailProduct />,
      },
      {
        path: 'shop',
        element: <Product />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <CheckOut />,
      },
      {
        path: 'dashboard',
        element: <DashboardSceen />,
        children: [
          { index: true, element: <Dashboard /> },
          {
            path: 'product',
            element: <AdminProduct />,
          },
          {
            path: 'product/createproduct',
            element: <CreataProduct />,
          },
          {
            path: 'order',
            element: <Order />,
          },
          {
            path: 'order/:id',
            element: <OrderDetail />,
          },
          {
            path: 'category',
            element: <Category />,
          },
          {
            path: 'brand',
            element: <Brand />,
          },
          {
            path: 'carousel',
            element: <CarouselSceen />,
          },
          {
            path: 'carousel/createcarousel',
            element: <CreateCarousel />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
