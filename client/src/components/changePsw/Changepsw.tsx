import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '../../hooks';

export default function ChangePwd() {
  const pathName = useLocation();
  const { User } = useAppSelector((state) => state.User);
  const [check, setCheck] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const changePassword = async (e: any) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        await axios.post('/user/changepassword', {
          email: User.email,
          password: password,
        });
        alert('Password Updated.');
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        // Bắt lỗi khi nhận respone từ axios
        if (err instanceof AxiosError) {
          alert(err.response?.data.msg);
        } else {
          console.log('Unexpected error', err);
        }
      }
      // window.location.href = '/';
    } else {
      alert('Password and Confirm Password need to be the same');
    }
  };
  return (
    <div className="login_page">
      <div>
        <form onSubmit={changePassword}>
          <h2>New Password</h2>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
          />
          <div className="row">
            <button type="submit">Change</button>
          </div>
        </form>
      </div>
    </div>
  );
}
