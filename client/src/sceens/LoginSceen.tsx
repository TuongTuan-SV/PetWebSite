import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setLogin, setLogout } from '../redux/slices/userSlice';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../api/config';
import { getuser } from '../redux/slices/userSlice';
type TUser = {
  email: string;
  password: string;
};

export default function Login() {
  const [userInput, setUserInput] = useState<TUser>({
    email: '',
    password: '',
  });
  const pathName = useLocation();

  const dispatch = useAppDispatch();
  const { User, login } = useAppSelector((state) => state.User);
  //Thực hiện khi nhấn nút login
  const SubmitLogin = async (e: any) => {
    e.preventDefault();
    try {
      // console.log(user);
      //Send request cho phía api kiểm tra tài khoản có tồn tại không
      const res = await axios.post(`/user/login`, { ...userInput });
      if (res.data.user.role === 0) {
        localStorage.setItem('firstLogin', 'true');
        window.location.href = '/';
      } else {
        localStorage.setItem('admin', 'true');
        window.location.href = '/';
        if (pathName.pathname.includes('/dashboard'))
          window.location.href = '/dashboard';
        else window.open('http://localhost:3000/dashboard', '_blank');
        // window.location.href = "/dashboard"
      }
      //Lưu thông tin người dùng và token về state
      console.log(res);
    } catch (err) {
      // Bắt lỗi khi nhận respone từ axios
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  };

  const handleLogout = (e: any) => {
    try {
      dispatch(setLogout());
    } catch (err) {
      // Bắt lỗi khi nhận respone từ axios
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  };
  //Xử lý nhập dữ liệu trên from đăng nhập
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  return (
    <div>
      {login ? (
        <div>
          <p>Login success</p>
        </div>
      ) : (
        <div>
          <form onSubmit={SubmitLogin}>
            <h2>login</h2>
            <input
              type="email"
              name="email"
              value={userInput.email}
              onChange={handleInput}
            ></input>
            <input
              type="password"
              name="password"
              value={userInput.password}
              onChange={handleInput}
            ></input>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
