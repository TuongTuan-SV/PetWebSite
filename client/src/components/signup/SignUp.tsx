import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import './Signup.css';

export default function SignUp() {
  const [userInput, setUserInput] = useState<any>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 0,
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const registerSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/signup', { ...userInput });
      console.log(res);
      localStorage.setItem('firstLogin', 'true');

      window.location.href = '/';
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.msg);
      } else {
        console.log('Unexpected error', err);
      }
    }
  };
  return (
    <div className="account-dropdown active">
      <div className="account-wrap d-none">
        <div className="account-inner">
          {/* <div className="login-form-head">
            <span className="login-form-title"></span>
            <span className="pull-right">
              <Link to="/signup">Login</Link>
            </span>
          </div> */}
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
              Login
            </button>
          </form>
          <div className="login-form-bottom ml-1">
            <Link to="/"> Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
