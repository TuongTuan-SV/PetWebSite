import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';

export default function OrderDetail() {
  const parmas = useParams();
  const { history } = useAppSelector((state) => state.User);

  const SelectHistory = history.find((item: any) => {
    if (item._id == parmas.id) return item;
  });
  // const { Cart } = SelectHistory;
  // console.log(SelectHistory.car);
  // console.log(OrderDetail);

  // if (OrderDetail.length === 0) return null;
  return (
    <div className="History_Page">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {SelectHistory?.Cart.map((item: any) => (
            <tr key={item._id}>
              <td>{<img src={item.images[0]} alt=" " />}</td>
              <td>{item.Name}</td>
              <td>{item.quantity}</td>
              <td>
                {new Number(item.Price * item.quantity).toLocaleString(
                  'us-US',
                  {
                    style: 'currency',
                    currency: 'USD',
                  }
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
