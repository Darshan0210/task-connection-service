import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { taskerId } = location.state || {};
  const hourlyRate = parseFloat(sessionStorage.getItem('hourlyRate'));  // Fetch hourly rate from session storage
  const userId = sessionStorage.getItem('userID');  // Fetch user ID from session storage

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('16:00');
  const [totalHours, setTotalHours] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [partialAmount, setPartialAmount] = useState(0);
  const [scriptLoaded, setScriptLoaded] = useState(false);  // State to track if Razorpay script is loaded

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);  // Set to true once Razorpay script is loaded
        console.log("Razorpay script loaded");
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript(); // Load Razorpay script when component mounts
  }, []);

  const calculateTotalHours = () => {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    if (start && end && end > start) {
      const timeDiff = end - start;
      const hours = timeDiff / (1000 * 60 * 60);
      const workHoursPerDay = 10;  // 8 AM to 4 PM

      // Calculate full workdays within the date range
      const totalDays = Math.floor(hours / 24);
      const fullWorkdayHours = totalDays * workHoursPerDay;

      // Calculate hours for partial days (start/end times)
      const remainingHours = hours % 24;
      const partialDayHours = Math.min(remainingHours, workHoursPerDay);

      const totalWorkHours = fullWorkdayHours + partialDayHours;
      setTotalHours(Math.ceil(totalWorkHours));  // Round up any partial hours to the next full hour

      const amount = Math.ceil(totalWorkHours) * hourlyRate;
      setTotalAmount(amount);
      setPartialAmount(amount / 2);
    } else {
      setTotalHours(0);
      setTotalAmount(0);
      setPartialAmount(0);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Check if Razorpay script is loaded before initiating payment
    if (!scriptLoaded) {
      alert('Razorpay SDK is still loading. Please wait...');
      return;
    }

    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Please check your connection.');
      return;
    }

    const options = {
      key: 'rzp_test_KA0MVYPAHSnecF', // Replace with your Razorpay key
      amount: partialAmount * 100,  // Convert to paise
      currency: 'INR',
      name: 'Task Conection service',
      description: 'Booking Tasker',
      handler: async function (response) {
        // Log the full response from Razorpay to verify it's correct
        console.log('Razorpay response:', response);
      
        // You should have all the required information in the response object
        const { razorpay_payment_id } = response;
      
        // If the required fields are available, proceed with the backend request
        if (razorpay_payment_id) {
          // Send the payment info and other booking details to the backend for storage
          try {
            const res = await axios.post('http://localhost:5000/api/payment-verification', {
              razorpay_payment_id,
              taskerId,
              userId,
              totalAmount,
              partialAmount,
              startDate,
              endDate,
              startTime,
              endTime,
              totalHours,
              role:'customer'
            });

            if (res.data.success) {
              alert('Payment verified and booking details saved!');
              sessionStorage.setItem('role','customer');  // or 'customer'
              navigate('/Taskerhome')

            } else {
              alert('Error saving booking details');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Payment verification failed');
          }
        } else {
          console.error('Missing Razorpay response details');
        }
      },
      prefill: { name, email, contact },
      notes: { taskerId, userId },
      theme: { color: '#F37254' },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-7xl w-full flex bg-white rounded-xl shadow-lg overflow-hidden">
        
        <div className="w-full lg:w-1/2 px-6 py-8 bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Billing Information</h2>
          <form onSubmit={handlePayment}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="tel"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <label className="block text-gray-700">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <label className="block text-gray-700">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <label className="block text-gray-700">Start Time:</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <label className="block text-gray-700">End Time:</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={calculateTotalHours}
                className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                Calculate Hours & Amount
              </button>
              <p className="mt-2 text-gray-800">Total Hours: {totalHours}</p>
              <p className="mt-2 text-gray-800">Total Amount: ₹{totalAmount}</p>
              <p className="mt-2 text-gray-800">Partial Amount (50%): ₹{partialAmount}</p>
            </div>
          </form>
        </div>

       
        <div className="w-full lg:w-1/2 bg-indigo-600 text-white flex items-center justify-center py-8">
          <button
            onClick={handlePayment}
            className="px-8 py-4 bg-indigo-700 rounded-lg text-xl font-semibold hover:bg-indigo-800 transition"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
 


