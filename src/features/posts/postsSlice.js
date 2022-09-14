import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: 1,
    title: 'Post #1',
    content: 'Some content here ... ',
    createdAt: sub(new Date(), { minutes: 30 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      thumbsDown: 0,
      wow: 0,
      heart: 0,
    },
  },
  {
    id: 2,
    title: 'Post #2',
    content: 'More content here ... ',
    createdAt: sub(new Date(), { minutes: 20 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      thumbsDown: 0,
      wow: 0,
      heart: 0,
    },
  },
  {
    id: 3,
    title: 'Post #3',
    content: 'Even more content here ... ',
    createdAt: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      thumbsDown: 0,
      wow: 0,
      heart: 0,
    },
  },
];

// const reactionEmojis = {
//   thumbsUp: '👍',
//   thumbsDown: '👎',
//   wow: '🤩',
//   heart: '❤️',
// };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            createdAt: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              thumbsDown: 0,
              wow: 0,
              heart: 0,
            },
          },
        };
      },
    },
    addReaction: {
      reducer(state, action) {
        const { postId, reaction } = action.payload;
        const post = state.find((post) => post.id === postId);
        if (post) {
          post.reactions[reaction] += 1;
        }
      },
    },
  },
});

export const selectAllPosts = (state) => state.posts;
export const { createPost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
