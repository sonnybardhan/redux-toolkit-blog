import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    name: 'jack',
  },
  {
    id: 2,
    name: 'ziggy',
  },
  {
    id: 3,
    name: 'william',
  },
  {
    id: 4,
    name: 'miles',
  },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

// export const getUserById = state => state.users.find()
export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
