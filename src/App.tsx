// Node-modules
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Link, Navigate } from 'react-router-dom';
// Styling 
import './App.css';
// Page Components
import Loading from './components/Loading/Loading'
import Register from './Pages/Register/Register';
import Validate from './Pages/Validate/Validate';
import Dashboard from './Pages/Dashboard/Dashboard';
import NotFound from './Pages/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'validate',
        element: <Validate />,
      },
      {
        path: 'loading',
        element: <Loading />,
      },
      {
        path: 'dashboard',
        element: (
          // <PrivateRoute>
          <Dashboard />
          // </PrivateRoute>
        ),
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

// Site layout
function LayoutComponent() {
  return (
    <div className='App-Wrapper'>
      <nav>
        <Link to='/register'>Register</Link>
        <Link to='/loading'>Loading</Link>
        <Link to='/validate'>PhoneValidation</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/llama'>NotFound</Link>
      </nav>

      <Outlet />

    </div>
  );
}

// Main app
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;


// function PrivateRoute({ children }) {
//   const isAuthenticated = //Run authentication function
// NAVIGATE TO CHAT COMPONENT
//   return isAuthenticated ? children : <Navigate to="/" />;
// }