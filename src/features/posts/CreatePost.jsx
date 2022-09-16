import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import React, { useState } from 'react';
import { createPost } from './postsSlice';
import { addPost } from './postsSlice';

const CreatePost = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  // const save = title && content && userId ? true : false;
  const save =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
      ? true
      : false;

  const handleSave = (e) => {
    e.preventDefault();
    if (save) {
      try {
        setAddRequestStatus('pending');
        console.log('post to add: ', { title, body: content, userId });
        dispatch(addPost({ title, body: content, userId })).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
      } catch (error) {
        console.error('Error! Failed to save the post. ', err);
      } finally {
        setAddRequestStatus('idle');
      }
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
