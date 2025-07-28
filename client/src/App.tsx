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
import Bookings from '../../client/src/dashboard/AdminDashboard/bookings/Booking';
import Rooms from '../../client/src/dashboard/AdminDashboard/rooms/Rooms'
import Hotels from '../../client/src/dashboard/AdminDashboard/hotels/Hotels'
import User from "../../client/src/dashboard/AdminDashboard/users/User"
import ManageAnalytics from '../../client/src/dashboard/AdminDashboard/analytics/ManageAnalytics'
import ManageSettings from '../../client/src/dashboard/AdminDashboard/settings/ManageSettings'
import SearchFilters from '../../client/src/dashboard/UserDashboard/ViewHotels/Hotels'; 
import Payment from './dashboard/AdminDashboard/payments/Payment'; 
//import Logout from './dashboard/AdminDashboard/logout/Logout'
import LogoutModal from './dashboard/AdminDashboard/logout/Logout';
import UserLogout from './dashboard/UserDashboard/userLogout/UserLogout';
import Chat from './components/Chat/Chat';
import Analytics from './dashboard/UserDashboard/analytics/Analytics';
import BookingHistory from './dashboard/UserDashboard/bookings/BookingHistory';
import Tickets from './dashboard/UserDashboard/tickets/Tickets';
import Support from "../../client/src/dashboard/AdminDashboard/support/Support"


function App() {
  const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'Admin');
  const isUser = useSelector((state: RootState) => state.user.user?.role === 'User');
  
  

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
          path: 'bookings',
          element: <Bookings />
        },
        {
          path: 'support',
          element: <Support />
        },
        {
          path: 'users',
          element: <User />
        },
        {
          path: 'payments',
          element: <Payment/>
        },
        {
          path: 'rooms',
          element: <Rooms/>
        },
        {
          path: 'hotels',
          element: <Hotels/>
        },
        {
          path: 'analytics',
          element: <ManageAnalytics/>
        },
        {
          path: 'settings',
          element: <ManageSettings/>
        },
        {
          path: 'logout',
          element: <LogoutModal/>
        },

      ]
    },
    // User dashboard routes
    {
      path: '/user/dashboard',
      element: isUser ? <UserDashboard /> : <Login />,
      children: [
        {
          path: 'viewhotels',
          element: <SearchFilters />
        },
        {
          path: 'bookinghistory',
          element: <BookingHistory />,
        },
        {
          path: 'supportticket',
          element: <Tickets />
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
          path: 'loggingout',
          element: <UserLogout />
        },
         {
          path: 'useranalytics',
          element: <Analytics />
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
      <Chat />
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
