import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';

import './styles.css';

function Login() {
  return (
    <div className='page'>
      <h1>Login</h1>
    </div>
  );
}

function Play() {
  return (
    <div className='page'>
      <h1>Play</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <nav>
          <NavLink to='/'>Login</NavLink>
          <NavLink to='/play'>Play</NavLink>
        </nav>

        <main>
          <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/play' element={<Play />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
