import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './OrderHistory.css';
import { UpdataStatus } from '../../redux/slices/orderSlice';
import { getHistory } from '../../redux/slices/userSlice';
export default function OrderHistory() {
  const dispatch = useAppDispatch();
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
  const cancelOrder = (id: any) => {
    window.confirm('Cancel Order ?')
      ? dispatch(UpdataStatus({ id, status: 'Cancel' })).then(() => {
          dispatch(getHistory());
        })
      : null;
  };
  return (
    <>
      {history ? (
        <div className="History_Page">
          <h2>History</h2>
          <h4>You have {history.length} Orders</h4>

          <table>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Date of purchased</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {history
                .slice()
                .reverse()
                ?.map((item: any) => {
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
                      <td id={item.Status} style={{ color: '#fff' }}>
                        {item.Status}
                      </td>
                      <td>
                        <Link to={`/history/${item._id}`}>View Detail</Link>
                      </td>
                      <td>
                        <button
                          className="btn"
                          id="Cancel"
                          style={{ color: '#fff', transition: 'all 1s' }}
                          onClick={() => {
                            cancelOrder(item._id);
                          }}
                        >
                          Cancel Order
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
