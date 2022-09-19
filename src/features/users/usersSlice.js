import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(USERS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// export const getUserById = state => state.users.find()
export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;

// const initialState = [
//   {
//     id: 1,
//     name: 'jack',
//   },
//   {
//     id: 2,
//     name: 'ziggy',
//   },
//   {
//     id: 3,
//     name: 'william',
//   },
//   {
//     id: 4,
//     name: 'miles',
//   },
// ];
