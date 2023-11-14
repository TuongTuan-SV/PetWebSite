import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './Signup.css';
import { useAppDispatch } from '../../hooks';
import { setCreateAccount } from '../../redux/slices/userSlice';

export default function SignUp() {
  const [userInput, setUserInput] = useState<any>({
    FirstName: '',
    LastName: '',
    email: '',
    password: '',
    role: 0,
  });
  const dispatch = useAppDispatch();
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const registerSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/signup', { ...userInput });
      localStorage.setItem('firstLogin', 'true');
      window.location.href = '/';
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  };
  return (
    <div className="account-dropdown active">
      <div className="account-wrap d-none">
        <div className="account-inner">
          <form className="ziggy-login-form-ajax" onSubmit={registerSubmit}>
            <div className="NameField">
              <p style={{ marginRight: '10px' }}>
                <label>First Name </label>
                <span className="required">*</span>
                <input
                  name="firstname"
                  type="text"
                  required
                  placeholder="First Name"
                  value={userInput.firstName}
                  onChange={handleInput}
                ></input>
              </p>
              <p>
                <label>Last Name</label>
                <span className="required">*</span>
                <input
                  name="lastname"
                  type="text"
                  required
                  placeholder="Last Namer"
                  value={userInput.lastname}
                  onChange={handleInput}
                ></input>
              </p>
            </div>

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
              className="btn btn-primary btn-block w-100 mt-1"
            >
              Create Account
            </button>
          </form>
          <div className="login-form-bottom ml-1">
            <p style={{ fontSize: '0.87rem' }}>Aleady have an Account? </p>
            <Link
              to="/"
              onClick={() => {
                dispatch(setCreateAccount());
              }}
            >
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
