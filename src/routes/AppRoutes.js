import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import HomePage from '../pages/index';
import MovieExplorer from '../pages/MovieExplorer';
import Watchlist from '../pages/WatchlistPage';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/movie-explorer',
        element: (
            <ProtectedRoute>
                <MovieExplorer />
            </ProtectedRoute>
        ),
    },
    {
        path: '/watchlist',
        element: (
                <Watchlist />
        ),
    },
    
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;