import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Components/root';
import Chatroom from './Components/chatroom';
import { Provider } from 'react-redux';
import accountStore from './accountStore';
import Chat from './Components/chat';
import ErrorPage from './Components/errorComponent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <Chatroom />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home/chat',
        element: <Chat />,
        errorElement: <ErrorPage />,
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={accountStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
