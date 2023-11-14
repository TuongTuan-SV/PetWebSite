import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Row from './row/Row';
import { useAppSelector } from '../../../../hooks';
import './pendindorder.css';
export default function PendingOrders() {
  const { Orders } = useAppSelector((state) => state.Order);
  const [history, setHistory] = useState([]);

  return (
    <div className="PendingOrder">
      <h2>PendingOrders</h2>
      {Orders.slice()
        .reverse()
        .map((item: any) =>
          item.Status === 'Pending' ? (
            <Row
              order_day={new Date(item.createdAt).toLocaleDateString()}
              order_by={item.FirstName}
              amount={item.Cart.length}
              total={item.Total}
              key={item._id}
            ></Row>
          ) : null
        )}
    </div>
  );
}
