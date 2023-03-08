import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './Component/App';
import Login from './Component/Login';
import ChatList from './Component/ChatList';
import ChatRoom from './Component/ChatRoom';
import Mypage from './Component/Mypage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/chatList',
        element: <ChatList />,
      },
      {
        path: '/chatRoom',
        element: <ChatRoom />,
      },
      {
        path: '/myPage',
        element: <Mypage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
