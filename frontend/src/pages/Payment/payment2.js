import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Payment2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use `remaining_amount` to match the state key passed during navigation
  const { remaining_amount, bookingId } = location.state || {}; 
  console.log("bookingId and remainf amount:",bookingId)

  // Initialize state with the value from location.state or default to 0
  const [remaining, setRemaining] = useState(remaining_amount || 0);

  useEffect(() => {
    if (!remaining_amount) {
      alert('No remaining amount passed. Redirecting to booking page...');
      navigate('/booking');  // Redirect if no amount is passed
    } else {
      setRemaining(remaining_amount);
    }
  }, [remaining_amount, navigate]);

  // Function to handle full payment API call
  const handlePayFull = async () => {
    try {

        const taskerId = sessionStorage.getItem('tasker_Id');
      // API call to update payment status in the backend
      const response = await axios.put('http://localhost:5000/api/payment/pay-full', {
        bookingId: bookingId,
        remainingAmount: remaining,
        taskerId:taskerId
      });
      
      // Check if the update was successful
      if (response.data.success) {
        alert('Payment successful! Thank you.');
        navigate('/Mybooking');  // Redirect to Mybooking page
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-7xl w-full flex bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 px-6 py-8 bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Remaining Payment</h2>
          <p className="text-lg text-gray-800">Remaining Amount: ₹{remaining}</p>
          <button
            onClick={handlePayFull}  // Call the handlePayFull function on click
            className="mt-4 px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Pay Full
          </button>
          <button
            onClick={() => navigate('/Mybooking')}  // Navigate back to booking page
            className="mt-4 ml-4 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment2;
