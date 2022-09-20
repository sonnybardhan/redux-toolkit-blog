import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
  count: 0,
});
// const initialState = {
//   posts: [],
//   status: 'idle',
//   error: null,
//   count: 0,
// };

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const addPost = createAsyncThunk('posts/addPost', async (newPost) => {
  try {
    const response = await axios.post(POSTS_URL, newPost);
    console.log('created: ', response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const editPost = createAsyncThunk('posts/editPost', async (post) => {
  const { id } = post;
  try {
    const response = await axios.put(`${POSTS_URL}/${id}`, post);
    return response.data;
  } catch (error) {
    return post; //only for testing redux for this example (since our API doesn't take posts);
    return error.message;
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (post) => {
  const { id } = post;
  console.log('delete called');
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    console.log('delete response: ', response);
    if (response?.status === 200) {
      return post;
    } else {
      const responseStr = response?.status + ' ' + response.statusText;
      return responseStr;
    }
  } catch (error) {
    return error.message;
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addReaction: {
      reducer(state, action) {
        const { postId, reaction } = action.payload;
        // const post = state.posts.find((post) => post.id === postId);
        const post = state.entities[postId];
        if (post) {
          post.reactions[reaction] += 1;
        }
      },
    },
    increaseCount(state, action) {
      state.count += 1;
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
        // state.posts = state.posts.concat(retrievedPosts);
        postsAdapter.upsertMany(state, retrievedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.reactions = {
          thumbsUp: 0,
          thumbsDown: 0,
          wow: 0,
          heart: 0,
        };
        action.payload.date = new Date().toISOString();

        // state.posts.push(action.payload);
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('update could not be completed');
          console.log('issue with post: ', action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('could not delete the post!');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        // state.posts = state.posts.filter((post) => post.id !== id);
        postsAdapter.removeOne(state, id);
      });
  },
});

// export const selectAllPosts = (state) => state.posts.posts;

export const {
  selectAll: selectAllPosts,
  selectById: getPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPostsByUserId = (state, userId) =>
  state.posts.posts.filter((post) => Number(post.userId) === Number(userId));
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) =>
    posts.filter((post) => Number(post.userId) === Number(userId))
);
// export const getPostById = (state, postId) =>
//   state.posts.posts.find((currentPost) => currentPost.id === postId);

export const getCount = (state) => state.posts.count;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const { createPost, addReaction, increaseCount } = postsSlice.actions;
export default postsSlice.reducer;
