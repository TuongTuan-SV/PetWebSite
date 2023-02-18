import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const SubmitLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/user/login', {
        ...user,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
      // if (err instanceof Error) {
      //   // ✅ TypeScript knows err is Error
      //   console.log(err);
      // } else {
      //   console.log('Unexpected error', err);
      // }
    }
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div>
      <form onSubmit={SubmitLogin}>
        <h2>login</h2>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInput}
        ></input>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInput}
        ></input>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
}
