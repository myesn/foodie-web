import React from 'react';
import { useRoutes } from 'react-router-dom';

import Infrastructure from '../components/Infrastructure';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Profile from '../pages/Profile';
import ItemDetail from '../pages/Item/Detail';

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
        {
          path: '/item/detail',
          element: <ItemDetail />,
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
