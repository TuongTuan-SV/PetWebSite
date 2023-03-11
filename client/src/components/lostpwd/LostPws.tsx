import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function LostPwd() {
  const pathName = useLocation();
  const [email, setEmail] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const checkEmail = async (e: any) => {
    e.preventDefault();
    const res = await axios.post('/user/lostpassword', { email: email });
    if (res.data.user) return setCheck(true);
    return alert('User not Exist!');
  };

  const changePassword = async (e: any) => {
    e.preventDefault();
    console.log('ádasd');
    if (password === confirmPassword) {
      console.log('ádasd');
      await axios.post('/user/changepassword', {
        email: email,
        password: password,
      });
      // window.location.href = '/';
    } else {
      alert('Password and Confirm need to be the same');
      setPassword('');
      setConfirmPassword('');
    }
  };
  return (
    <div className="login_page">
      {check ? (
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
      ) : (
        <div className="">
          <form onSubmit={checkEmail}>
            <h2>Reset Password</h2>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />

            <div className="row">
              <button type="submit">Continue</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
