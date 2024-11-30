import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const taskerId = sessionStorage.getItem("taskerId"); // Get the taskerId from sessionStorage

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!taskerId) {
          console.log("Tasker ID is not available.");
          return;
        }

        const response = await axios.get('http://localhost:5000/api/tasker-bookings', {
          params: { taskerId: taskerId },
        });

        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching tasker bookings:', error.response ? error.response.data : error.message);
      }
    };

    fetchBookings();
  }, [taskerId]);

  // Function to mark task as completed
  const handleMarkAsCompleted = async (bookingId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/taskers/${taskerId}/complete`);

      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.booking_id === bookingId
              ? { ...booking, task_status: "COMPLETED" }
              : booking
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Bookings for Your Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking.booking_id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {booking.customerFirstName} {booking.customerLastName}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {booking.customerPhone}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {booking.customerEmail}
                </p>
                <p className="text-gray-600 mt-2">
                  <strong>Booking Period:</strong> {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Time:</strong> {booking.start_time} - {booking.end_time}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-blue-600">
                    ${booking.total_amount.toFixed(2)}
                  </span>
                  {booking.task_status === "PENDING" && (
                    <button
                      onClick={() => handleMarkAsCompleted(booking.booking_id)}
                      className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                      Finish Task
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default TaskerBookings;
