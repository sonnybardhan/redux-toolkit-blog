import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h1>Redux Blog</h1>
      <nav>
        <p
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100px',
            alignItems: 'center',
          }}
        >
          <Link to='/'>Home</Link>
          <Link to='post'>Post</Link>
        </p>
      </nav>
    </header>
  );
};

export default Header;
