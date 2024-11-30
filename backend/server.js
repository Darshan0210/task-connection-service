

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/booking'); // Correct path
const userRoleRoutes = require('./models/UserRole');
const session = require('express-session');

///app.use('/api', bookingRoutes);



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/SignUp', require('./routes/SignUp')); // Handles signup
app.use('/api/login', require('./routes/login')); // Handles login
app.use('/api/TaskerProfile', require('./models/TaskerProfile')); // Correct route path
app.use('/api/ProvideService', require('./models/ProvideService')); // Correct route path

app.use('/api/Tasker', require('./routes/Taskers')); // Correct route path
app.use('/api', require('./routes/MyBooking')); // Correct route path
app.use('/api/payment', require('./routes/payment')); // Correct route path
app.use('/api', require('./models/Insurance'));
app.use('/api', bookingRoutes); // Correct route path

app.use('/api', userRoleRoutes);
//for the fetchingn the booking
app.use('./api/booking',require('./routes/MyBooking'))
//for the  mytask
app.use('/api', require('./models/my-tasks'));
//for the payment dispay in tasker board
app.use('/api',require('./models/tasker-payment'))
//for the upload as a server static
app.use('/uploads', express.static('uploads'));
//for the fetching the booking detais
app.use('./api',require('./routes/MyBooking'));
// cancellation
//app.use('./api/cancellation',require('./routes/MyBooking-cancel'));
//app.use('./api',require('./routes/Rating'))


const rating = require('./routes/Rating');
app.use('/api', rating);



const cancelRoutes = require('./routes/MyBooking-cancel');
app.use('/api', cancelRoutes);


// for the remaingn amount
//app.use('./api',require('./routes/Remaining_amount'));

const remaining = require('./routes/Remaining_amount');
app.use('/api', remaining);

//remiaing amount update
//const remainingAmount = require('./routes/MyBooking-remaingamount');
app.use('/api/payment',require('./routes/MyBooking-remaingamount'))
// Error handling middleware (optional)




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
