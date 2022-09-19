import { useSelector } from 'react-redux';
import { selectAllUsers } from './usersSlice';
import { Link } from 'react-router-dom';

import React from 'react';

const Users = () => {
  const users = useSelector(selectAllUsers);
  return (
    <div>
      <ol>
        {users.map((user) => (
          <li key={user.id} style={{ textAlign: 'start' }}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Users;
