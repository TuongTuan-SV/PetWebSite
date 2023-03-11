import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './Checkout.css';
import {
  CreateOrder,
  setOrder,
  setOrderCart,
} from '../../redux/slices/orderSlice';
import { setCart, updateCart, clearCart } from '../../redux/slices/userSlice';

// const initialState = {
//   FirstName: '',
//   LastName: '',
//   Address: '',
//   Country: '',
//   City: '',
//   PostalCode: 0,
//   Cart: [],
//   PaymentMethod: 0,
//   Total: 0,
// };

export default function CheckOut() {
  const dispatch = useAppDispatch();
  const { User } = useAppSelector((state) => state.User);
  const { cart } = User;
  const { order } = useAppSelector((state) => state.Order);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const getTotal = () => {
      const total: number = cart.reduce((pev: any, item: any) => {
        // console.log(item);
        return pev + item.Price * item.quantity;
      }, 0);

      setTotal(total);
      dispatch(setOrder({ ...order, Total: total }));
      dispatch(setOrderCart(cart));
    };

    cart ? getTotal() : null;
  }, [User]);

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    console.log(name);
    dispatch(setOrder({ ...order, [name]: value }));
  };
  const handleCreateOrder = (e: any) => {
    e.preventDefault();
    dispatch(CreateOrder()).then((res) => {
      console.log(res.payload.msg);
      if (res.payload.msg === 'Order Created') {
        dispatch(clearCart());
        dispatch(updateCart());
      }
    });
  };
  return (
    <div className="Container">
      {/* ========================== LEFT SIDE ==============================================*/}
      <div className="Left">
        <div className="BoxTitle">
          <h3>Shipping Address</h3>
        </div>

        <form onSubmit={handleCreateOrder}>
          <div className="Name-box">
            <div className="inputContainer FirstName-input">
              <label>First Name</label>
              <input
                type="text"
                name="FirstName"
                required
                value={order.FirstName}
                onChange={handleChangeInput}
              ></input>
            </div>
            <div className="inputContainer LastName-input">
              <label>Last Name</label>
              <input
                type="text"
                name="LastName"
                required
                value={order.LastName}
                onChange={handleChangeInput}
              ></input>
            </div>
          </div>
          <div className="inputContainer Country">
            <label>Country</label>
            <input
              type="text"
              name="Country"
              required
              value={order.Country}
              onChange={handleChangeInput}
            ></input>
          </div>
          <div className="inputContainer PostalCode">
            <label>Postal Code</label>
            <input
              type="number"
              name="PostalCode"
              required
              value={order.PostalCode}
              onChange={handleChangeInput}
            ></input>
          </div>
          <div className="inputContainer City">
            <label>City</label>
            <input
              type="text"
              name="Address"
              required
              value={order.Address}
              onChange={handleChangeInput}
            ></input>
          </div>
          <div className="form-bottom">
            <button className="btn btn-primary ">Place Order</button>
          </div>
        </form>
      </div>

      {/* ========================== RIGHT SIDE ==============================================*/}
      <div className="right">
        <div>
          <table className="CartItem">
            <thead>
              <tr>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item: any) => {
                return (
                  <tr key={item._id}>
                    <td>{item.Name}</td>
                    <td>{item.Price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity * item.Price}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ textAlign: 'right' }}>
                <td colSpan={2}>Grand Total</td>
                <td colSpan={2}>{total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
