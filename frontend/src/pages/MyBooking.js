import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/MyBooking'); // Adjust this endpoint as needed
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <div key={booking.booking_id} className="border border-gray-200 rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-bold">Booking ID: {booking.booking_id}</h2>
              <p><strong>Tasker ID:</strong> {booking.tasker_id}</p>
              <p><strong>Total Amount:</strong> ${booking.total_amount}</p>
              <p><strong>Partial Amount Paid:</strong> ${booking.partial_amount}</p>
              <p><strong>Status:</strong> 
                <span className={`font-bold ${booking.task_status === 'COMPLETED' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {booking.task_status}
                </span>
              </p>
              <p><strong>Start Date:</strong> {booking.start_date}</p>
              <p><strong>End Date:</strong> {booking.end_date}</p>
              <p><strong>Total Hours:</strong> {booking.total_hours} hrs</p>
            </div>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
