import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectPostsByUserId } from '../posts/postsSlice';

import React from 'react';

const UserPosts = () => {
  const { userId } = useParams();
  const userPosts = useSelector((state) => selectPostsByUserId(state, userId));

  return (
    <div>
      <ul>
        {userPosts.map((post) => (
          <li key={post.id} style={{ textAlign: 'start' }}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
