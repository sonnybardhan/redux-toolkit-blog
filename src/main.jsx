import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/users/usersSlice';
import { fetchPosts } from './features/posts/postsSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
