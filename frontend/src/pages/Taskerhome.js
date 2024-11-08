import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import AutomotiveServicesImage from './images/AutomotiveServicesImage.png';
import HealthWellnessImage from './images/HealthWellnessImage.png';
import EventServicesImage from './images/EventServicesImage.jpg';
import PersonalServicesImage from './images/PersonalServicesImage.jpg';
import HomeServicesImage from './images/HomeServicesImage.jpeg';

function CustomerDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg text-white">
        <div className="p-4 text-xl font-bold">Customer Dashboard</div>
        <ul className="mt-4 space-y-4">
          <li className="flex items-center px-4 py-2 hover:bg-blue-700 rounded">
            <FaHome className="mr-2" />
            <Link to="/">Home</Link>
          </li>
          <li className="flex items-center px-4 py-2 hover:bg-blue-700 rounded">
            <FaCalendarAlt className="mr-2" />
            <Link to="/MyBooking">My Bookings</Link>
          </li>
          <li className="flex items-center px-4 py-2 hover:bg-blue-700 rounded">
            <FaSignOutAlt className="mr-2" />
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>

      {/* Main Content - Service Categories */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-8">Choose a Service to Get Started</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Home Services */}
          <Link to="/CustomerHomeServices" className="group">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform group-hover:scale-105">
              <img
                src={HomeServicesImage}
                alt="Home Services"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">Home Services</h2>
                <p className="mt-2 text-gray-600">Find or offer home services like cleaning, plumbing, etc.</p>
              </div>
            </div>
          </Link>

          {/* Personal Services */}
          <Link to="/CustomerPersonalservices" className="group">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform group-hover:scale-105">
              <img
                src={PersonalServicesImage}
                alt="Personal Services"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">Personal Services</h2>
                <p className="mt-2 text-gray-600">Find or offer tutoring, personal training, pet care, etc.</p>
              </div>
            </div>
          </Link>

          {/* Event Services */}
          <Link to="/CustomerEventservices" className="group">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform group-hover:scale-105">
              <img
                src={EventServicesImage}
                alt="Event Services"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">Event Services</h2>
                <p className="mt-2 text-gray-600">Find or offer event planning, photography, catering, etc.</p>
              </div>
            </div>
          </Link>

          {/* Health & Wellness */}
          <Link to="/CustomerHealthwellness" className="group">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform group-hover:scale-105">
              <img
                src={HealthWellnessImage}
                alt="Health & Wellness"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">Health & Wellness</h2>
                <p className="mt-2 text-gray-600">Find or offer fitness training, massage therapy, etc.</p>
              </div>
            </div>
          </Link>

          {/* Automotive Services */}
          <Link to="/CustomerAutomotiveservices" className="group">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform group-hover:scale-105">
              <img
                src={AutomotiveServicesImage}
                alt="Automotive Services"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800">Automotive Services</h2>
                <p className="mt-2 text-gray-600">Find or offer automotive services like car washing, etc.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* See All Arrow */}
        <div className="flex justify-center mt-12">
          <Link to="/services" className="text-blue-500 text-lg font-medium hover:text-yellow-300 transition-colors">
            See All Services →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
