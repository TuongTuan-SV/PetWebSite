import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';

export default function OrderDetail() {
  const { Orders } = useAppSelector((state) => state.Order);
  const [OrderDetail, setOrderDetail] = useState<any>([]);

  const parmas = useParams();

  useEffect(() => {
    if (parmas.id) {
      console.log('ádasds');
      Orders.forEach((item: any) => {
        if (item._id === parmas.id) setOrderDetail(item);
      });
    }
  }, [parmas.id, history]);

  console.log(OrderDetail);

  if (OrderDetail.length === 0) return null;
  return (
    <div className="admin_order">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {OrderDetail.Cart?.map((item: any) => (
            <tr key={item._id}>
              <td>
                <img src={item.images[0].url} alt=" " />
              </td>
              <td>{item.Name}</td>
              <td>{item.quantity}</td>
              <td>
                {item.Price.toLocaleString('us-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </td>
              <td>
                {(item.Price * item.quantity).toLocaleString('us-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
