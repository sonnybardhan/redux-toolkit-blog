import { useSelector, useDispatch } from 'react-redux';
import { getPostById, editPost, deletePost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';

const EditPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const users = useSelector(selectAllUsers);
  const post = useSelector((state) => getPostById(state, Number(postId)));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const save =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
      ? true
      : false;

  if (!post) {
    return <section>Post not found!</section>;
  }

  const handleSave = async (e) => {
    e.preventDefault();
    if (save) {
      try {
        setAddRequestStatus('pending');
        await dispatch(
          editPost({
            id: postId,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
      } catch (error) {
        console.error('Error! Failed to save the post. ', error);
      } finally {
        setAddRequestStatus('idle');
        // navigate(`/post/${postId}`);
        navigate(`/`);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      setAddRequestStatus('pending');
      await dispatch(deletePost(post)).unwrap();
      setTitle('');
      setContent('');
      setUserId('');
      navigate('/');
    } catch (error) {
      console.log(error.message);
    } finally {
      setAddRequestStatus('idle');
    }
  };

  const allUsers = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <main>
      <h2>Edit Post</h2>
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
        <div className='buttons-container'>
          <button onClick={handleDelete} disabled={!save}>
            Delete
          </button>
          <button onClick={handleSave} disabled={!save}>
            Save
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditPost;
