import React from 'react';
import { useRoutes } from 'react-router-dom';

import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';
import Infrastructure from '../components/Infrastructure';

export default function App() {
  const routes = [
    {
      path: '/',
      element: <Infrastructure />,
      children: [
        { index: true, element: <Home /> },

        {
          path: '/profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/signin',
      element: <Signin />,
    },
    { path: '*', element: <NotFound /> },
  ];
  const element = useRoutes(routes);

  return element;
}
