import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
        const post = state.posts.find((post) => post.id === postId);
        if (post) {
          post.reactions[reaction] += 1;
        }
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        let min = 1;
        const retrievedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            thumbsDown: 0,
            wow: 0,
            heart: 0,
          };
          return post;
        });
        state.posts = state.posts.concat(retrievedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.status;
export const getPostsError = (state) => state.error;
export const { createPost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
