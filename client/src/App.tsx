import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Login from './sceens/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Login></Login>
    </div>
  );
}

export default App;
