const express = require('express');
const multer = require('multer'); // Middleware for handling file uploads
const path = require('path'); // Node.js module for handling file paths
const fileController = require('../controllers/fileController'); // Importing the file controller

const router = express.Router(); // Creating a new router object

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const currentDir = req.body.currentDir || ''; // Determine the current directory from the request
        cb(null, `uploads/${currentDir}`); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file with a timestamp to prevent duplicates
    }
});

const upload = multer({ storage: storage }); // Initialize multer with the defined storage configuration

// Routes
// Route for downloading files
router.get('/download', (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.query.file || ''); // Resolve the file path
    res.download(filePath, (err) => {
        if (err) {
            console.error(err); // Log any errors during the download
            res.status(500).send('File not found or cannot be downloaded.'); // Return error message if download fails
        }
    });
});

// Route for displaying the home page
router.get('/', fileController.getHomePage);

// Route for creating a new folder
router.post('/create-folder', fileController.createFolder);

// Route for uploading a file
router.post('/upload', upload.single('file'), fileController.uploadFile);

// Route for deleting an item (file or folder)
router.post('/delete', fileController.deleteItem);

module.exports = router; // Export the router for use in other modules
