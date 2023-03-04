import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setLogin, setLogout } from '../redux/slices/userSlice';

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
  const { User, login } = useAppSelector((state) => state.User);
  //Thực hiện khi nhấn nút login
  const SubmitLogin = async (e: any) => {
    e.preventDefault();
    try {
      // console.log(user);
      //Send request cho phía api kiểm tra tài khoản có tồn tại không
      const res = await axios.post('http://localhost:5000/user/login', {
        ...userInput,
      });

      //Lưu thông tin người dùng và token về state
      dispatch(setLogin(res.data));
      // console.log(res);
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
