import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from './postsSlice';
// import User from '../users/User';
import React from 'react';
// import TimeAgo from './TimeAgo';
// import ReactionButtons from './ReactionButtons';
import { useEffect } from 'react';
import Post from './Post';

const Posts = () => {
  const dispatch = useDispatch();
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const posts = useSelector(selectAllPosts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <p>Loading ... </p>;
  } else if (status === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => (
      <Post post={post} key={Math.random()} />
    ));
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  } else {
    console.log('status: ', status);
  }

  return (
    <main>
      <h2>Posts</h2>
      {content}
    </main>
  );
};

export default Posts;
