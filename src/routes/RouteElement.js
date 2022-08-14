import { useRoutes } from 'react-router-dom';

// dashboard
import HomePage from 'pages/HomePage';

// default 404 page
import Page404 from 'pages/Page404';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

// initialize route
const RouteElement = (props) => {
  const elements = useRoutes(routes);
  return elements;
};

export default RouteElement;
