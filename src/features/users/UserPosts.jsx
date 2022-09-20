import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectPostsByUserId, selectPostsByUser } from '../posts/postsSlice';
import { selectUserById } from './usersSlice';

import React from 'react';

const UserPosts = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));
  // const userPosts = useSelector((state) =>
  //   selectPostsByUserId(state, Number(userId))
  // );

  const userPosts = useSelector((state) => selectPostsByUser(state, userId));

  const userPostsLis = userPosts.map((post) => (
    <li key={post.id} style={{ textAlign: 'start' }}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <div>
      <h3>{user?.name}</h3>
      <ul>{userPostsLis}</ul>
    </div>
  );
};

export default UserPosts;
