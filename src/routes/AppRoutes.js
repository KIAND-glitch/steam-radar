import React from 'react';
import { RouterProvider, createBrowserRouter, useNavigate, useLocation } from 'react-router-dom';  // Ensure this is 'react-router-dom'
import HomePage from '../pages/index';
import MovieExplorer from '../pages/MovieExplorer';
import Watchlist from '../pages/WatchlistPage';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { useAuth } from '../auth/authContext'; // Import the context to check if the user is authenticated

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If the user is not authenticated, redirect to login
  if (!user) {
    navigate('/login', { state: { from: location } });
    return null;
  }

  return element;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/movie-explorer',
    element: (
      <ProtectedRoute
        element={<MovieExplorer />} // Only accessible if the user is logged in
      />
    ),
  },
  {
    path: '/watchlist',
    element: (
      <ProtectedRoute
        element={<Watchlist />} // Only accessible if the user is logged in
      />
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
