import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router
import axios from 'axios';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(null);
  const userId = sessionStorage.getItem('userID');
  const navigate = useNavigate(); // Replace history with useNavigate()

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/myBookings?userId=${userId}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  // Function to handle cancellation
  const handleCancelBooking = async (bookingId) => {
    const taskerId = sessionStorage.getItem('tasker_Id'); 

    try {
      const response = await axios.put('http://localhost:5000/api/cancel-booking', { 
        bookingId,
        taskerId  // Ensure this key matches the backend
      });
  
      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.booking_id === bookingId
              ? { ...booking, task_status: 'CANCELLED' }
              : booking
          )
        );
        alert('Booking cancelled successfully!');
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const handlePayFullClick = async (bookingid) => {
    console.log('Booking ID:', bookingid);
    try {
      const response = await axios.get(`http://localhost:5000/api/remaining-amount?bookingId=${bookingid}`);
      console.log('API Response:', response.data);
      const remaining_amount = response.data.remainingAmount;
      console.log('Remaining amount:', remaining_amount);

      setRemainingAmount(remaining_amount);
      setSelectedBooking(bookingid);
      setIsPaymentModalOpen(true);  // Open the payment modal
    } catch (error) {
      console.error('Error fetching remaining amount:', error);
      alert('Failed to fetch remaining amount. Please try again.');
    }
  };

  // Function to confirm the payment and navigate to the payment page
  const handleConfirmPayment = () => {
    if (selectedBooking && remainingAmount !== null) {
      // Use navigate instead of history.push in React Router v6
      navigate('/payment2', { state: { remaining_amount: remainingAmount, bookingId: selectedBooking } });
      setIsPaymentModalOpen(false); // Close the payment modal after confirming payment
    }
  };

  // Function to handle rating submission
  const handleRatingSubmit = async () => {
    const tasker_Id = sessionStorage.getItem('tasker_Id');
    try {
      const response = await axios.post('http://localhost:5000/api/submit-rating', {
        taskerId: tasker_Id,
        rating: rating
      });

      if (response.status === 200) {
        alert('Thank you for your rating!');
        setIsRatingModalOpen(false); // Close rating modal after submitting
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">My Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <div key={booking.booking_id} className="bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-700 rounded-lg p-6 shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-xl font-semibold text-white mb-3">Booking ID: {booking.booking_id}</h2>
              <p className="text-white mb-2"><strong>Tasker ID:</strong> {booking.tasker_id}</p>
              <p className="text-white mb-2"><strong>Total Amount:</strong> ${booking.total_amount.toFixed(2)}</p>
              <p className="text-white mb-2"><strong>Paid Amount:</strong> ${booking.partial_amount.toFixed(2)}</p>
              <p className="text-white mb-2">
                <strong>Status:</strong>
                <span className={`ml-2 font-semibold ${booking.task_status === 'COMPLETED' ? 'text-green-300' : booking.task_status === 'CANCELLED' ? 'text-red-300' : 'text-yellow-300'}`}>
                  {booking.task_status}
                </span>
              </p>
              <p className="text-white mb-2"><strong>Start Date:</strong> {new Date(booking.start_date).toLocaleDateString()}</p>
              <p className="text-white mb-4"><strong>End Date:</strong> {new Date(booking.end_date).toLocaleDateString()}</p>
              <p className="text-white mb-4"><strong>Total Hours:</strong> {booking.total_hours} hrs</p>

              <div className="mt-4 flex space-x-4">
                {/* Pay Full Button */}
                {booking.task_status !== 'COMPLETED' && booking.task_status !== 'CANCELLED' && (
  <button
    className="bg-teal-500 text-white py-2 px-6 rounded-md shadow-md transition duration-300 transform hover:bg-teal-600 hover:scale-105"
    onClick={() => handlePayFullClick(booking.booking_id)}
  >
    Pay Full
  </button>
)}

{booking.task_status === 'COMPLETED' && (
  <button
    className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md transition duration-300 transform hover:bg-blue-600 hover:scale-105"
    onClick={() => {
      setSelectedBooking(booking.booking_id);
      setIsRatingModalOpen(true);  // Open the rating modal
    }}
  >
    Review Tasker
  </button>
)}


                {/* Cancel Button */}
                {booking.task_status !== 'CANCELLED' && booking.task_status !== 'COMPLETED' && (
  <button
    className="bg-red-500 text-white py-2 px-6 rounded-md shadow-md transition duration-300 transform hover:bg-red-600 hover:scale-105"
    onClick={() => handleCancelBooking(booking.booking_id)}
  >
    Cancel
  </button>
)}

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No bookings available.</p>
        )}
      </div>

      {/* Modal to confirm payment */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Confirm Payment</h2>
            <p className="mb-4">Remaining amount to be paid: ${remainingAmount}</p>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded-md"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white py-2 px-6 rounded-md"
                onClick={handleConfirmPayment}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {isRatingModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Rate the Tasker</h2>
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white py-2 px-6 rounded-md"
                onClick={() => setIsRatingModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded-md"
                onClick={handleRatingSubmit}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
