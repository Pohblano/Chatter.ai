// Node-modules
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Link, Navigate } from 'react-router-dom';
// Styling 
import logo from './logo.svg';
import './App.css';
// Custom Components
import Loading from './components/Loading/Loading'
import Register from './components/Register/Register';
import PhoneValidation from './components/PhoneValidation/PhoneValidation';
import Dashboard from './components/Dashboard/Dashboard';

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
        path: 'validation',
        element: <PhoneValidation />,
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
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

// Site layout
function LayoutComponent() {
  return (
    <div className='App-Wrapper'>
      <nav>
        <Link to='/register'>Register</Link>
        <Link to='/loading'>Loading</Link>
        <Link to='/validation'>PhoneValidation</Link>
        <Link to='/dashboard'>Dashboard</Link>
      </nav>

      <Outlet />



      {/* <Register/> */}
      {/* <Loading/>
        <PhoneValidation/> */}
      {/* <Dashboard/> */}

    </div>
  );
}

// 404 error
function NotFoundPage() {
  return <h1>404 - Page Not Found</h1>;
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