import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Login from './sceens/Login';
import Product from './sceens/Product';
import Upload from './components/upload/Upload';
function App() {
  return (
    <div className="App">
      <Upload></Upload>
    </div>
  );
}

export default App;
