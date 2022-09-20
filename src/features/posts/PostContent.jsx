import React, { memo } from 'react';
import User from '../users/User';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';

const PostContent = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>
        {post.body.length > 100 ? `${post.body.slice(0, 100)} ... ` : post.body}{' '}
      </p>
      <Link to={`post/${post.id}`}>View post</Link>
      <User userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </article>
  );
};
export default PostContent;
