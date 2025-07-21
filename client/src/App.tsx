// src/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import LandingPage from './pages/Landingpage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import AboutPage from './pages/Aboutpage';
import VerifyUser from './pages/auth/VerifyUser';
import ContactPage from './pages/Contactpage';
import ServicesPage from './pages/Servicespage';
import AdminDashboard from './dashboard/AdminDashboard/AdminDashboard';
import UserDashboard from '../../client/src/dashboard/UserDashboard/UserDashboard';
import { Toaster } from 'sonner';
import { useSelector } from 'react-redux';
import { type RootState } from './app/store';
import Error from './components/error/Error';

function App() {
  const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'admin');
  const isUser = useSelector((state: RootState) => state.user.user?.role === 'user');
  
  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/services',
      element: <ServicesPage />
    },
    {
      path: '/contact',
      element: <ContactPage />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/auth/verify',
      element: <VerifyUser />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/admin/dashboard',
      element: isAdmin ? <AdminDashboard /> : <Login />,
      children: [
        {
          path: 'manage',
          element: <h1>manage hotels and bookings</h1>
        },
        {
          path: 'users',
          element: <h1>users</h1>
        },
        {
          path: 'profile',
          element: <h1>profile</h1>
        },
        {
          path: 'monitor',
          element: <h1>Monitor Bookings</h1>
        },
        {
          path: 'support',
          element: <h1>Support Tickets</h1>
        },
        {
          path: 'analytics',
          element: <h1>Analytics</h1>
        },
      ]
    },
    // User dashboard routes
    {
      path: '/user/dashboard',
      element: isUser ? <UserDashboard /> : <Login />,
      children: [
        {
          path: 'view',
          element: <h1>view</h1>
        },
        {
          path: 'monitor',
          element: <h1>1</h1>
        },
        {
          path: 'book',
          element: <h2>2</h2>
        },
        {
          path: 'pay',
          element: <h3>3</h3>
        },
        {
          path: 'history',
          element: <h4>4</h4>
        },
      ]
    },

    {
      path: '*',
      element: <Error />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: 'bg-red-500 text-white',
            success: 'bg-green-500 text-white',
            info: 'bg-blue-500 text-white',
          },
        }}
      />
    </>
  );
}

export default App;
