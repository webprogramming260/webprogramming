import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Header() {
  return (
    <nav className='app-bar'>
      <Link label='home' />
      <Link label='users' />
      <Link label='about' />
    </nav>
  );
}

function Link(label) {
  return <div>{label.label}</div>;
}

function Content() {
  return <div className='content'>Here is the content</div>;
}

function Footer() {
  return <div className='app-bar'>Footer</div>;
}

function App() {
  return (
    <div className='app'>
      <Header />

      <Content />

      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
