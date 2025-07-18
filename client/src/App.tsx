// src/App.tsx
import { BrowserRouter, useRoutes } from "react-router-dom";
import { Toaster } from "sonner";

// Pages
import AboutPage from "./pages/Aboutpage";
import Landingpage from "./pages/Landingpage";
import Register from "../../client/src/pages/auth/Register";
import Login from "../../client/src/pages/auth/Login";
import VerifyUser from "./pages/auth/VerifyUser";
import Homepage from "./components/homepage/Homepage";


// Components
//import AdminDashboard from "./dashboard/AdminDashboard";
//import Cars from "./dashboard/Admin/cars/Cars";
//import Bookings from "./dashboard/Admin/bookings/Booking";
//import Contact from "./components/Contact/Contact";
//import Services from "./components/Services/Services";
//import UserDashboard from "./dashboard/UserDashboard/UserDashboard";
import Contactpage from "../../client/src/pages/Contactpage";
import ServicesPage from "../../client/src/pages/Servicespage";

const routes = [
  {
    path: '/',
    element: <Landingpage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/homepage',
    element: <Homepage />
  },
  
  {
    path: '/login',
    element: <Login />
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
    path: '/services',
    element: <ServicesPage/>
  },
  {
    path: '/contact',
    element: <Contactpage />
  },
  
    ]
  
function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

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
