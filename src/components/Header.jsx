import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '90vw',
      }}
    >
      <h1>Redux Blog</h1>
      <nav>
        <p
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '200px',
            alignItems: 'center',
          }}
        >
          <Link to='/'>Home</Link>
          <Link to='post'>Post</Link>
          <Link to='users'>Users</Link>
        </p>
      </nav>
    </header>
  );
};

export default Header;
