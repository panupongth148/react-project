import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';

const Home = () => <h2>Home Page</h2>;
const Dashboard = () => <h2>Dashboard Page</h2>;
const NotFound = () => <h2>404 - Page Not Found</h2>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}