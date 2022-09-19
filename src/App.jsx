import './App.css';
import CreatePost from './features/posts/CreatePost';
import Post from './features/posts/Post';
import Posts from './features/posts/Posts';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EditPost from './features/posts/EditPost';

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
      </Route>
    </Routes>
  );
}

export default App;
