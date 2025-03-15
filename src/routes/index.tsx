import { createBrowserRouter, Navigate } from 'react-router-dom';
import Notice from '../pages/Notice';
import Contact from '../pages/Contact';
import BoardWrite from '../pages/BoardWrite';
import BoardDetail from '../pages/BoardDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/notice/page/1" replace />,
  },
  {
    path: '/notice',
    element: <Navigate to="/notice/page/1" replace />,
  },
  {
    path: '/notice/details/:id',
    element: <BoardDetail />,
  },
  {
    path: '/notice/page/:page',
    element: <Notice />,
  },
  {
    path: '/contact',
    element: <Navigate to="/contact/page/1" replace />,
  },
  {
    path: '/contact/details/:id',
    element: <BoardDetail />,
  },
  {
    path: '/contact/page/:page',
    element: <Contact />,
  },
  {
    path: '/write/:category',
    element: <BoardWrite />,
  },
]); 