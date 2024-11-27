const fileModel = require('../models/fileModel'); // Importing the file model for file operations

const fileController = {
    // Controller method to render the home page
    getHomePage: (req, res) => {
        const currentDir = req.query.dir || ''; // Retrieve the current directory from query parameters or default to root
        const { folders, files } = fileModel.listItems(currentDir); // Get the list of folders and files in the current directory

        res.render('index', { currentDir, folders, files }); // Render the index view with directory data
    },

    // Controller method to handle folder creation
    createFolder: (req, res) => {
        const { folderName, currentDir } = req.body; // Extract folder name and current directory from request body
        fileModel.createFolder(currentDir, folderName); // Create the folder in the specified directory
        res.redirect(`/?dir=${currentDir}`); // Redirect back to the current directory
    },

    // Controller method to handle file uploads
    uploadFile: (req, res) => {
        const currentDir = req.body.currentDir || ''; // Retrieve the current directory from the request body or default to root
        res.redirect(`/?dir=${currentDir}`); // Redirect back to the current directory after upload
    },

    // Controller method to delete a file or folder
    deleteItem: (req, res) => {
        const { itemName, currentDir } = req.body; // Extract item name and current directory from the request body
        fileModel.deleteItem(currentDir, itemName); // Delete the specified file or folder
        res.redirect(`/?dir=${currentDir}`); // Redirect back to the current directory
    }
};

module.exports = fileController; // Export the file controller for use in routing
