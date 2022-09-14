import { useSelector } from 'react-redux';
import { selectAllPosts } from './postsSlice';
import User from '../users/User';
import React from 'react';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const reactionEmojis = {
  thumbsUp: '👍',
  thumbsDown: '👎',
  wow: '🤩',
  heart: '❤️',
};

const Posts = () => {
  const posts = useSelector(selectAllPosts);

  // const orderedPosts = posts.slice().sort((a, b) => b.createdAt - a.createdAt);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const postsToRender = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>
        {post.content.length > 50
          ? `${post.content.slice(0, 50)} ... `
          : post.content}{' '}
      </p>
      <User userId={post.userId} />
      <TimeAgo timestamp={post.createdAt} />
      <ReactionButtons post={post} />
      {/* <ReactionButtons postId={post.id} /> */}
    </article>
  ));

  return (
    <main>
      <h2>Posts</h2>
      {postsToRender}
    </main>
  );
};

export default Posts;
