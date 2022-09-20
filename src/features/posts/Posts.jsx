import { useSelector } from 'react-redux';
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  selectPostIds,
} from './postsSlice';
import React from 'react';
import PostContent from './PostContent';

const Posts = () => {
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  // const posts = useSelector(selectAllPosts);
  const orderedPostIds = useSelector(selectPostIds);

  let content;

  if (status === 'loading') {
    content = <p>Loading ... </p>;
  } else if (status === 'succeeded') {
    // const orderedPosts = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));
    // content = orderedPosts.map((post) => (
    //   <PostContent post={post} key={post.id} />
    // ));
    content = orderedPostIds.map((postId) => (
      <PostContent postId={postId} key={postId} />
    ));
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  } else {
    console.log('status: ', status);
  }

  return <main>{content}</main>;
};

export default Posts;
