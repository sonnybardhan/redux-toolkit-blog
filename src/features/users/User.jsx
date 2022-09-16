import React from 'react';
import { selectAllUsers } from './usersSlice';
import { useSelector } from 'react-redux';

const User = ({ userId }) => {
  // if (!userId) return <p className='author'>by Unknown</p>;

  const users = useSelector(selectAllUsers);
  const user = users.find(
    (currentUser) => Number(currentUser.id) == Number(userId)
  );

  // return <p className='author'>by x</p>;
  return <p className='author'>by {user?.name ? user.name : 'Unknown'}</p>;
};

export default User;
