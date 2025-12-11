import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';

import './styles.css';

function Login({ setUser }) {
  const [text, setText] = React.useState('');
  const navigate = useNavigate();

  function loginUser() {
    localStorage.setItem('user', text);
    setUser(text);
    navigate('/play');
  }

  function textChange(e) {
    setText(e.target.value);
  }

  return (
    <div className='page'>
      <h1>Login</h1>
      <input type='text' onChange={textChange} />
      <button onClick={loginUser}>Login</button>
    </div>
  );
}

function Play({ user }) {
  const [count, setCount] = React.useState(parseInt(localStorage.getItem('count')) || 0);
  const [msg, setMsg] = React.useState('...listening');

  function countClick() {
    setCount(count + 1);
    localStorage.setItem('count', count + 1);
  }

  React.useEffect(() => {
    setInterval(() => {
      const names = ['bob', 'sue', 'tim'];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCount = Math.floor(Math.random() * 100) + 1;
      const newMsg = `${randomName}: ${randomCount}`;
      setMsg(newMsg);
    }, 1000);
  });

  return (
    <div className='page'>
      <h1>Play - {user}</h1>
      <button onClick={countClick}>Count</button>
      <div>{count}</div>
      <div>{msg}</div>
    </div>
  );
}

function App() {
  const [user, setUser] = React.useState(localStorage.getItem('user') || null);
  return (
    <BrowserRouter>
      <div className='app'>
        <nav>
          {user}
          <NavLink to='/'>Login</NavLink>
          {user && <NavLink to='/play'>Play</NavLink>}
        </nav>

        <main>
          <Routes>
            <Route path='/' element={<Login setUser={setUser} />} exact />
            <Route path='/play' element={<Play user={user} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
