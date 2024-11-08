
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Customerhome from './pages/Customerhome';
import Insurance from './pages/Insurance';
import Services from './pages/Services';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import HomeServices from './pages/Homeservices/HomeServices';
import PersonalServices from './pages/PersonalServices/PersonalServices';
import EventServices from './pages/EventServices/EventServices';
import HealthWellness from './pages/HealthWellness/HealthWellness';
import AutomotiveServices from './pages/AutomotiveServices/AutomotiveServices';
import CreateProfile from './pages/ProfilePage'; 
import Footer from './components/Footer';
import PlumbingServices from './pages/Homeservices/PlumbingServices';
import ServiceAdded from './pages/ServiceAdded';
import AuthLoading from './pages/AuthLoading';
import PrivateRoute from './pages/PrivateRoute'; // Import the PrivateRoute component
import ProfilePage from './pages/ProfilePage';
import Logout from './pages/LogOut';
import Customerhomeservices from './pages/CustomerHomeservices'
import CustomerPersonalservices from './pages/CustomerPersonalservices'
import CustomerEventservices from './pages/CustomerEventservices'
import CustomerHealthwellness from './pages/CustomerHealthwellness'
import CustomerAutomotiveservices from './pages/CustomerAutomotiveservices'
//import TaskersList from './pages/Taskers'
import ServiceCategory from "./pages/Taskerhome"
import MyBooking from "./pages/MyBooking"
import Taskers from "./pages/Taskers"
import Payment from './pages/Payment/payment';


const checkTokenExpiration = () => {
  const expiration = localStorage.getItem('tokenExpiration');
  if (expiration && Date.now() > expiration) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    // Optionally, redirect to login if needed
    window.location.href = '/login';  // Redirect to login page
  }
};

checkTokenExpiration();



function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Customerhome" element={<Customerhome />} />
            <Route path="/Insurance" element={<Insurance />} />
            <Route path="/Customerhomeservices" element={<Customerhomeservices />} />
            <Route path="/CustomerPersonalservices" element={<CustomerPersonalservices />} />
            <Route path="/CustomerEventservices" element={<CustomerEventservices />} />
            <Route path="/CustomerHealthwellness" element={<CustomerHealthwellness />} />
            <Route path="/CustomerAutomotiveservices" element={<CustomerAutomotiveservices />} />
            <Route path="/services" element={<Services />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} ></Route>
            <Route path="/authlanding" element={<AuthLoading />} />
            <Route path="/Taskers" element={<Taskers />} />
            <Route path="/MyBooking" element={<MyBooking />} />
            <Route path="/payment" element={<Payment />} />

            {/* Protected Routes */}
            <Route 
              path="/home-services" 
              element={
                <PrivateRoute>
                  <HomeServices />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/plumbing-services" 
              element={
                <PrivateRoute>
                  <PlumbingServices />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/personal-services" 
              element={
                <PrivateRoute>
                  <PersonalServices />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/event-services" 
              element={
                <PrivateRoute>
                  <EventServices />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/health-wellness" 
              element={
                <PrivateRoute>
                  <HealthWellness />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/automotive-services" 
              element={
                <PrivateRoute>
                  <AutomotiveServices />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/Taskerhome" 
              element={
                <PrivateRoute>
                  <ServiceCategory />
                </PrivateRoute>
              } 
            />
            <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        } 
      />
            
            <Route path="/service-added" element={<ServiceAdded />} />
            <Route path="/create-profile" element={<CreateProfile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
