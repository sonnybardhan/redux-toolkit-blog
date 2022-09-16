import React from 'react';
import User from '../users/User';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const Post = ({ post }) => {
  // console.log('post: ', post);
  return (
    <article>
      <h3>{post.title}</h3>
      <p>
        {post.body.length > 100 ? `${post.body.slice(0, 100)} ... ` : post.body}{' '}
      </p>
      <User userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </article>
  );
};

export default Post;
