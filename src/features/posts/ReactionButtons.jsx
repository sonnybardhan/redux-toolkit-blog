import React from 'react';
import { useDispatch } from 'react-redux';
import { addReaction } from './postsSlice';

const reactionEmojis = {
  thumbsUp: '👍',
  thumbsDown: '👎',
  wow: '🤩',
  heart: '❤️',
};

const ReactionButtons = ({ post }) => {
  const { id, reactions } = post;

  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmojis).map(
    ([name, emoji]) => (
      <button
        key={Math.random()}
        onClick={() => dispatch(addReaction({ postId: id, reaction: name }))}
      >
        {emoji} {reactions[name]}
      </button>
    )
  );

  return <div className='reaction-buttons-container'>{reactionButtons}</div>;
};

export default ReactionButtons;
