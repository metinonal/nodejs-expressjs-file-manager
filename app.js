const express = require('express'); // Importing the Express framework
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const fileRoutes = require('./routes/fileRoutes'); // Importing the file routes module

const app = express(); // Creating an Express application

// EJS and Static Settings
app.set('view engine', 'ejs'); // Setting the view engine to EJS for rendering dynamic HTML
app.use(express.static('uploads')); // Serving static files from the 'uploads' directory
app.use(bodyParser.urlencoded({ extended: true })); // Enabling URL-encoded body parsing

// Adding Routes
app.use('/', fileRoutes); // Using the file routes for handling root-level requests

// Start the Server
const PORT = 3000; // Defining the port for the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Logging the server start message
});
