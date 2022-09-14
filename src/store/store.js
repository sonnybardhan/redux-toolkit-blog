import { configureStore } from '@reduxjs/toolkit';
import PostsReducer from '../features/posts/postsSlice';
import UsersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    posts: PostsReducer,
    users: UsersReducer,
  },
});
