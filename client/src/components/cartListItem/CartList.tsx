import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { decrement, removeItem, increment } from '../../redux/slices/userSlice';
import './Cart.css';
export default function CartList() {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.User);
  return (
    <div className="cart">
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
            console.log(item.product.Name);
            return (
              <tr key={item.product._id}>
                <td>
                  <img src={item.product.image} />
                </td>
                <td>{item.product.title}</td>
                <td>
                  <div className="quantity">
                    <button
                      onClick={() => dispatch(decrement(item.product.Name))}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increment(item.product.Name))}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  {(item.quantity * item.product.Price).toLocaleString(
                    'en-US',
                    {
                      style: 'currency',
                      currency: 'USD',
                    }
                  )}
                </td>
                <td>
                  <div
                    className="delete"
                    onClick={() => dispatch(removeItem(item.product.Name))}
                  >
                    x
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
