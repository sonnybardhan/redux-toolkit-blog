import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import React, { useState } from 'react';
import { createPost } from './postsSlice';

const CreatePost = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const save = title && content && userId ? true : false;

  const handleSave = (e) => {
    e.preventDefault();
    if (save) {
      dispatch(createPost(title, content, userId));
      setTitle('');
      setContent('');
      setUserId('');
    }
  };

  const allUsers = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <main>
      <h2>Create a Post</h2>
      <form>
        <label htmlFor='post-author'>Author</label>
        <select
          type='text'
          id='post-author'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option> - </option>
          {allUsers}
        </select>
        <label htmlFor='post-title'>Title</label>
        <input
          type='text'
          id='post-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='post-content'>Content</label>
        <textarea
          type='text'
          id='post-content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleSave} disabled={!save}>
          Save
        </button>
      </form>
    </main>
  );
};

export default CreatePost;
