import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './ShippingAdress.css';
import {
  CreateOrder,
  setOrder,
  setOrderCart,
  setDistrict,
  setProvice,
  setWard,
} from '../../redux/slices/orderSlice';
import { setCart, updateCart, clearCart } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
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
const initialState = {
  value: '',
  label: '',
};
export default function ShippingAdress() {
  const dispatch = useAppDispatch();
  const { User } = useAppSelector((state) => state.User);
  const { cart } = User;
  const { order } = useAppSelector((state) => state.Order);
  const [Provinces, setProvinces] = useState<any[]>();
  const [Districts, setDistricts] = useState<any[]>();
  const [Wards, setWards] = useState<any[]>();

  useEffect(() => {
    const ProvinceApi = async () => {
      const res: any = await axios.get(
        'https://provinces.open-api.vn/api/?depth=1'
      );
      setProvinces(res.data);
    };
    ProvinceApi();
  }, [User]);

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    console.log(name);
    dispatch(setOrder({ ...order, [name]: value }));
  };

  const handleProvince = async (e: any) => {
    dispatch(setProvice(e.label));
    const res: any = await axios.get(
      `https://provinces.open-api.vn/api/p/${e.value}/?depth=2`
    );
    console.log(res.data.districts);
    setDistricts(res.data.districts);
  };
  const handleDistricts = async (e: any) => {
    dispatch(setDistrict(e.label));
    const res: any = await axios.get(
      `https://provinces.open-api.vn/api/d/${e.value}/?depth=2`
    );
    console.log(res.data.districts);
    setWards(res.data.wards);
  };
  const handleWard = async (e: any) => {
    dispatch(setWard(e.label));
  };

  const handleOrder = () => {
    dispatch(setOrderCart(User.cart));
  };

  const options1 = Provinces?.map((Province: any) => {
    return { value: Province.code, label: Province.name };
  });
  const options2 = Districts
    ? Districts.map((District: any) => {
        return { value: District.code, label: District.name };
      })
    : [initialState];
  const options3 = Wards
    ? Wards.map((Ward: any) => {
        return { value: Ward.code, label: Ward.name };
      })
    : [initialState];
  return (
    <div className="Container">
      {/* ========================== LEFT SIDE ==============================================*/}

      <div className="BoxTitle">
        <h3>Shipping Address</h3>
      </div>
      <form>
        <div className="Name-box">
          <div className="checkout-file inputContainer FirstName-input">
            <label>
              First Name <span className="require">*</span>
            </label>
            <input
              type="text"
              name="FirstName"
              required
              value={order.FirstName}
              onChange={handleChangeInput}
            ></input>
          </div>
          <div className="checkout-file inputContainer LastName-input">
            <label>Last Name</label>
            <input
              type="text"
              name="LastName"
              value={order.LastName}
              onChange={handleChangeInput}
            ></input>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          {/* Chọn thành phố */}
          <div className="checkout-file inputContainer Country">
            <label>
              Provinces <span className="require">*</span>
            </label>
            <Select
              options={options1}
              onChange={handleProvince}
              placeholder="Select Province"
            ></Select>
          </div>
          {/* Chọn thành quận/huyện */}
          <div className="checkout-file inputContainer Country">
            <label>
              Districts <span className="require">*</span>
            </label>
            <Select
              options={options2}
              onChange={handleDistricts}
              placeholder="Select District"
            ></Select>
          </div>
          {/* Chọn phường */}
          <div className="checkout-file inputContainer Country">
            <label>
              Wards <span className="require">*</span>
            </label>
            <Select
              options={options3}
              onChange={handleWard}
              placeholder="Select Wards"
            ></Select>
          </div>
        </div>
        {/* Nhập địa chỉ */}
        <div className="checkout-file inputContainer City">
          <label>
            Address<span className="require">*</span>
          </label>
          <input
            type="text"
            name="Address"
            required
            value={order.Address}
            onChange={handleChangeInput}
          ></input>
        </div>
        {/* Nhập ghi chú */}
        <div className="checkout-file inputContainer City">
          <label>Order Note</label>
          <textarea
            name="OrderNote"
            id="description"
            required
            value={order.OrderNote}
            rows={3}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className="checkout-file form-bottom">
          <Link to="/checkout" onClick={handleOrder}>
            Next
          </Link>
        </div>
      </form>

      {/* ========================== RIGHT SIDE ==============================================*/}
      {/* <div className="right">
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
      </div> */}
    </div>
  );
}
