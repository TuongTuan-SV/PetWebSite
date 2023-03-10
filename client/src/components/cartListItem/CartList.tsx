import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  decrement,
  removeItem,
  increment,
  getuser,
  updateCart,
} from '../../redux/slices/userSlice';
import PayPalButton2 from '../paypalBtn/PayPalBtutton2';
import './Cart.css';
export default function CartList() {
  const dispatch = useAppDispatch();
  const { User } = useAppSelector((state) => state.User);
  const [total, setTotal] = useState<Number>(0);
  const { cart } = User;
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((pev: any, item: any) => {
        // console.log(item);
        return pev + item.Price * item.quantity;
      }, 0);

      setTotal(total);
    };

    cart ? getTotal() : null;
  }, [User]);

  const handleIncrement = (id: any) => {
    dispatch(increment(id));
    dispatch(updateCart());
    // dispatch(getuser());
  };

  const handleDecrement = (id: any) => {
    dispatch(decrement(id));
    dispatch(updateCart());
    // dispatch(getuser());
  };

  const handleRemove = (id: any) => {
    console.log(dispatch(removeItem(id)));

    dispatch(updateCart());
    // dispatch(getuser());
  };
  const tranSuccess = async (payment: any) => {
    console.log(payment);
    const { id } = payment;
    const { name, address } = payment.payer;
    console.log(address, id, cart, name);

    // const res = await axios.post(
    //   '/api/payment',
    //   { cart, id, address, name, total },
    //   {
    //     headers: { Authorization: token },
    //   }
    // );
    // console.log(res);
    // setCart([]);
    // addtocart([]);
    // alert('Order have been place');
    // setCallback(!callback);
  };
  return (
    <div className="cart">
      {cart ? (
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Title</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>button</td>
            </tr>
          </thead>
          <tbody>
            {cart.map((item: any) => {
              // console.log(item.Name);
              return (
                <tr key={item._id}>
                  <td>
                    <img src={item.images[0]} />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <div className="quantity">
                      <button onClick={() => handleDecrement(item._id)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item._id)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    {(item.quantity * item.Price).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </td>
                  <td>
                    <div
                      className="delete"
                      onClick={() => handleRemove(item._id)}
                    >
                      x
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}

      <div className="total">
        <h3>
          Total :
          {total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </h3>
        <button className="btn btn-primary">
          <Link to="/checkout">Process to checkout</Link>
        </button>
        {/* <PayPalButton2 total={total} tranSuccess={tranSuccess} /> */}
      </div>
    </div>
  );
}
