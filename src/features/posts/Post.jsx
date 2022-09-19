import { useSelector } from 'react-redux';
import { getPostById } from './postsSlice';
import { useParams, Link } from 'react-router-dom';
import User from '../users/User';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

import React from 'react';

const Post = () => {
  const { postId } = useParams();

  const post = useSelector((state) => getPostById(state, Number(postId)));
  // const post = useSelector((state) => getPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <User userId={post.userId} />
      <Link to={`/post/edit/${postId}`}>Edit post</Link>
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </article>
  );
};

export default Post;
