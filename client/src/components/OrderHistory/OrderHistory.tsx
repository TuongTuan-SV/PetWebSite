import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './OrderHistory.css';
export default function OrderHistory() {
  const { history } = useAppSelector((state) => state.User);
  // useEffect(() => {
  //   if (token) {
  //     const getHistory = async () => {
  //       const res = await axios.get("/user/history", {
  //         headers: { Authorization: token },
  //       });
  //       setHistory(res.data);
  //     };
  //     getHistory();
  //   }
  // }, [token, setHistory]);

  return (
    <div className="History_Page">
      <h2>History</h2>
      <h4>You have {history.length} Orders</h4>

      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of purchased</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.reverse().map((item: any) => {
            console.log(item._id);
            return (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  {item.Total.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </td>
                <td>
                  <Link to={`/history/${item._id}`}>View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
