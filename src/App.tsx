// Node-modules
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Link, Navigate } from 'react-router-dom';
// Styling 
import './App.css';
// Page Components
import Loading from './components/loading/Loading'
import Register from './Pages/Register/Register';
import Validate from './Pages/Validate/Validate';
import Dashboard from './Pages/Dashboard/Dashboard';
import NotFound from './Pages/NotFound/NotFound';
import { getFromLocalStorage } from './Actions/DashboardActions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: 'validate',
        element: <Validate />,
      },
    
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

// Private route which redirects user if still logged in
function PrivateRoute({ children }) {
  const isAuthenticated = (getFromLocalStorage('jwtToken')) ? true : false;
  return isAuthenticated ? children : <Navigate to="/register" />;
}

// Site layout
function LayoutComponent() {
  return (
    <div className='App-Wrapper h-svh'>
      <Outlet/>
    </div>
  );
}

// Main app
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} fallbackElement={<Loading/>} />
    </div>
  );
}

export default App;

