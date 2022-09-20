import { useSelector } from 'react-redux';
import { selectAllPosts, getPostsError, getPostsStatus } from './postsSlice';
import React from 'react';
import PostContent from './PostContent';

const Posts = () => {
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const posts = useSelector(selectAllPosts);

  let content;

  if (status === 'loading') {
    content = <p>Loading ... </p>;
  } else if (status === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostContent post={post} key={post.id} />
    ));
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  } else {
    console.log('status: ', status);
  }

  return <main>{content}</main>;
};

export default Posts;
