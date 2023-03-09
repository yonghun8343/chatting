import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import axios from 'axios';
import GlobalStyle from './GlobalStyle';
import App from './Component/App';
import Login from './Component/Login';
import ChatList from './Component/ChatList';
import ChatRoom from './Component/ChatRoom';
import Mypage from './Component/Mypage';
import store, { persistor } from './redux/store/store';
import Register from './Component/Register';

axios.defaults.baseURL = 'http://15.164.169.156:3000';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
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
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
