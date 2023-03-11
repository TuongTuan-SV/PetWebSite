import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCreateAccount } from '../../redux/slices/userSlice';
import SignUp from '../signup/SignUp';
import './login.css';

type TUser = {
  email: string;
  password: string;
};

export default function Login() {
  const [userInput, setUserInput] = useState<TUser>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const pathName = useLocation();
  const { createAccount } = useAppSelector((state) => state.User);
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

  //Xử lý nhập dữ liệu trên from đăng nhập
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };
  return (
    <>
      {createAccount ? (
        <SignUp />
      ) : (
        <div className="account-dropdown active">
          <div className="account-wrap d-none">
            <div className="account-inner">
              <div className="login-form-head">
                <span className="login-form-title">Sign in</span>
                <span className="pull-right">
                  <Link to="/" onClick={() => dispatch(setCreateAccount())}>
                    Create an Account
                  </Link>
                </span>
              </div>
              <form className="ziggy-login-form-ajax" onSubmit={SubmitLogin}>
                <p>
                  <label>Username or email </label>
                  <span className="required">*</span>
                  <input
                    name="email"
                    type="text"
                    required
                    placeholder="Username"
                    value={userInput.email}
                    onChange={handleInput}
                  ></input>
                </p>
                <p>
                  <label>Password </label>
                  <span className="required">*</span>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    value={userInput.password}
                    onChange={handleInput}
                  ></input>
                </p>
                <button
                  type="submit"
                  className="btn btn-primary btn-block w-100 "
                >
                  Login
                </button>
              </form>
              <div className="login-form-bottom">
                <a
                  onClick={() => {
                    window.location.href = '/lostpassword';
                  }}
                >
                  Lost your password?
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
