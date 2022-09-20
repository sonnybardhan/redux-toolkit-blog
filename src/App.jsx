import './App.css';
import CreatePost from './features/posts/CreatePost';
import Post from './features/posts/Post';
import Posts from './features/posts/Posts';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import EditPost from './features/posts/EditPost';
import Users from './features/users/Users';
import UserPosts from './features/users/UserPosts';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Posts />} />
        <Route path='post'>
          <Route index element={<CreatePost />} />
          <Route path=':postId' element={<Post />} />
          <Route path='edit/:postId' element={<EditPost />} />
        </Route>
        <Route path='users'>
          <Route index element={<Users />} />
          <Route path=':userId' element={<UserPosts />} />
        </Route>
      </Route>

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;
