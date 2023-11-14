import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './Checkout.css';
import { clearCart, getuser, updateCart } from '../../redux/slices/userSlice';
import {
  CreateOrder,
  clearOrder,
  setTotal,
} from '../../redux/slices/orderSlice';
import { getAdminProducts, getProducts } from '../../redux/slices/productSlice';
export default function Checkout() {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.Order);

  useEffect(() => {
    const getTotal = () => {
      const total: number = order.Cart.reduce((pev: any, item: any) => {
        // console.log(item);
        return pev + item.Price * item.quantity;
      }, 0);

      dispatch(setTotal(total));
    };
    order ? getTotal() : null;
  }, [order]);
  const handleCreateOrder = (e: any) => {
    e.preventDefault();
    dispatch(CreateOrder()).then((res) => {
      if (res.payload.msg === 'Order Created') {
        alert('Order Created');
        dispatch(getuser());
        dispatch(clearCart());
        dispatch(updateCart());
        dispatch(clearOrder());
        dispatch(getProducts());
        dispatch(getAdminProducts());
      }
    });
  };
  return (
    <div style={{ margin: '20px 0' }}>
      <h2>Your Order</h2>
      {order ? (
        <div className="Order_Container">
          <div className="Order_Wrap">
            <div className="Order_detail">
              <span>Products</span>
              <span>Total</span>
            </div>

            {order.Cart?.map((item: any) => (
              <div className="Order_detail">
                <span>
                  {item.Name}X{item.quantity}
                </span>
                <span>
                  {(item.quantity * item.Price).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </span>
              </div>
            ))}
            <div className="Order_detail">
              <span>ORDER TOTAL</span>
              <span style={{ color: 'red' }}>
                {order.Total.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
            </div>
            <div style={{ width: '50%' }}>
              <button className="Checkout" onClick={handleCreateOrder}>
                CheckOut
              </button>
            </div>
          </div>

          {/* <table>
            <thead>
              <tr>
                <td>Product</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {order.Cart.map((item: any) => (
                <tr key={order.FirstName}>
                  <td>
                    {item.Name}
                    {item.quantity}
                  </td>
                  <td>
                    {' '}
                    {(item.quantity * item.Price).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      ) : null}
    </div>
  );
}
