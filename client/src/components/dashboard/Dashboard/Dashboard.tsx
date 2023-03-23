import React, { useContext, useEffect, useState } from 'react';
import Hightcharts from 'highcharts';
import HightchartsReact from 'highcharts-react-official';
// import { GlobalState } from '../../../GlobalState';
import { MdAttachMoney } from 'react-icons/md';
import { AiOutlineShoppingCart, AiOutlineUserAdd } from 'react-icons/ai';
import axios from 'axios';
import Card from './card/Card';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getalluser } from '../../../redux/slices/userSlice';
import './dashboard.css';
// import PendingOrders from './pendingorder/PendingOrders';

export default function Dashboard() {
  const { AdminUser } = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  const [history, setHistory] = useState([]);
  const [Data, setData] = useState([]);
  useEffect(() => {
    // if (token) {
    // const getHistory = async () => {
    //   try {
    //     const res = await axios.get('/api/payment');
    //     setHistory(res.data);
    //     // console.log(res,history)
    //   } catch (err: any) {
    //     alert(err.response.data.msg);
    //   }
    //   // };
    // };
    // getHistory();
  }, [dispatch]);

  useEffect(() => {
    const summedResponse = history.slice(-30).reduce((day: any, cur: any) => {
      let inAcc = false;
      day.forEach((o: any) => {
        if (
          new Date(o.createdAt).toLocaleDateString() ==
          new Date(cur.createdAt).toLocaleDateString()
        ) {
          // if obj store is already in new array, increase sum
          o.total += cur.total;
          inAcc = true;
        }
      });
      if (!inAcc) {
        day.push(cur); // if obj store isn't already in new array, add it
      }
      return day;
    }, []);
    setData(summedResponse);
  }, [history]);

  const DailyRevenue = () => {
    let date = new Date();
    let total = 0;
    Data.map((data: any) => {
      if (
        new Date(data.createdAt).toLocaleDateString() ===
        date.toLocaleDateString()
      )
        total += data.total;
    });
    return total.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const NewOrder = () => {
    let date = new Date();
    let total = 0;
    Data.map((data: any) => {
      if (
        new Date(data.createdAt).toLocaleDateString() ===
        date.toLocaleDateString()
      )
        total += 1;
    });
    return total;
  };

  const NewUser = () => {
    let date = new Date();
    let total = 0;
    AdminUser.length > 0
      ? AdminUser?.map((user: any) => {
          if (
            new Date(user.createdAt).toLocaleDateString() ===
            date.toLocaleDateString()
          )
            total += 1;
        })
      : null;
    return total;
  };

  const options = {
    title: {
      text: '30 Day Revenue History',
    },
    xAxis: {
      categories: Data.map((data: any) => {
        return new Date(data.createdAt).toLocaleDateString();
      }),
    },
    series: [
      {
        name: '',
        data: Data.map((data: any) => {
          return data.total;
        }),
      },
    ],
  };
  return (
    <div className="admin_dashboard">
      <div className="Header_Dashboard">
        <HightchartsReact highcharts={Hightcharts} options={options} />
      </div>
      <div className="CardHolder">
        <Card
          icon={<MdAttachMoney size={50} color={'red'} />}
          title={'Daily Revenue'}
          content={DailyRevenue()}
        />
        <Card
          icon={<AiOutlineShoppingCart size={50} color={'green'} />}
          title={'New Orders'}
          content={NewOrder()}
        />
        <Card
          icon={<AiOutlineUserAdd size={50} color={'blue'} />}
          title={'New users'}
          content={NewUser()}
        />
      </div>
      <div>{/* <PendingOrders /> */}</div>
    </div>
  );
}
