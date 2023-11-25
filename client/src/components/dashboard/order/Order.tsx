import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import './order.css';
import { UpdataStatus, getAllOrder } from '../../../redux/slices/orderSlice';
import {
  getAdminProducts,
  getProducts,
} from '../../../redux/slices/productSlice';
import { getHistory } from '../../../redux/slices/userSlice';
export default function Order() {
  // const state = useContext(GlobalState);
  // const [history, setHistory] = state.userAPI.history;
  // const [IsAdmin] = state.userAPI.IsAdmin;
  // const [token] = state.token;
  const dispatch = useAppDispatch();
  const { Orders } = useAppSelector((state) => state.Order);
  const { history, User, loading } = useAppSelector((state) => state.User);

  const status: any = ['Shipping', 'Cancel', 'Pending', 'Complete'];

  useEffect(() => {
    if (loading!) {
      dispatch(getAllOrder());
      console.log('asdasd');
    }
  });

  const updateStatus = (id: any, status: any) => {
    console.log(id, status);
    window.confirm('Update status.')
      ? dispatch(UpdataStatus({ id, status })).then(() => {
          dispatch(getAllOrder());
          dispatch(getHistory());
          dispatch(getProducts());
          dispatch(getAdminProducts());
        })
      : null;
  };
  return (
    <div className="admin_order">
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date of purchased</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Orders.length > 0
            ? Orders?.map((item: any) => {
                return (
                  <tr key={item._id}>
                    <td>{item.FirstName}</td>
                    <td>
                      {item.Total.toLocaleString('us-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </td>
                    <td>
                      <select
                        className="Status"
                        id={item.Status}
                        name="Brand"
                        onChange={(e: any) => {
                          updateStatus(item._id, e.target.value);
                        }}
                      >
                        <option value={item.Status} id={item.Status}>
                          {item.Status}
                        </option>
                        {status.map((status: any) =>
                          status !== item.Status ? (
                            <option value={status} key={status} id={status}>
                              {status}
                            </option>
                          ) : null
                        )}
                      </select>
                    </td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/dashboard/order/${item._id}`}>
                        View Detail
                      </Link>
                    </td>
                  </tr>
                );
              })
                .slice()
                .reverse()
            : null}
        </tbody>
      </table>
    </div>
  );
}
