import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './redux/store';
import { Provider } from 'react-redux/es/exports';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './utils/NotFount';
import Upload from './components/upload/Upload';
import Login from './sceens/Login';
import Signup from './sceens/Signup';
import Home from './sceens/Home';
import DetailProduct from './sceens/DetailProduct';
import Product from './sceens/Product';
import Brand from './components/brand/Brand';
import Cart from './sceens/Cart';
import CreataProduct from './sceens/CreataProduct';
import CheckOut from './components/CartCheckOut/CheckOut';
import History from './sceens/History';
import OrderDetailSceen from './sceens/OrderDetailSceen';
import LostPwdSceen from './sceens/LostPwdSceen';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'createproduct',
        element: <CreataProduct />,
      },

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
