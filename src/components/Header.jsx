import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCount, increaseCount } from '../features/posts/postsSlice';

const Header = () => {
  const count = useSelector(getCount);
  const dispatch = useDispatch();
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
          <button onClick={() => dispatch(increaseCount())}>{count}</button>
        </p>
      </nav>
    </header>
  );
};

export default Header;
