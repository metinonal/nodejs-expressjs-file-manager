const fs = require('fs'); // Node.js module for interacting with the file system
const path = require('path'); // Node.js module for working with file and directory paths

const BASE_DIR = path.join(__dirname, '../uploads'); // Base directory for file operations

const fileModel = {
    // Method to list folders and files in the specified directory
    listItems: (currentDir = '') => {
        const targetPath = path.join(BASE_DIR, currentDir); // Determine the target directory path
        const items = fs.readdirSync(targetPath, { withFileTypes: true }); // Read directory contents with metadata

        const folders = items.filter(item => item.isDirectory()).map(item => item.name); // Get folder names
        const files = items.filter(item => item.isFile()).map(item => item.name); // Get file names

        return { folders, files }; // Return an object containing folders and files
    },

    // Method to create a new folder in the specified directory
    createFolder: (currentDir, folderName) => {
        const folderPath = path.join(BASE_DIR, currentDir, folderName); // Resolve the full folder path
        fs.mkdirSync(folderPath, { recursive: true }); // Create the folder, including parent directories if needed
    },

    // Method to delete a file or folder
    deleteItem: (currentDir, itemName) => {
        const itemPath = path.join(BASE_DIR, currentDir, itemName); // Resolve the full path of the item
        fs.rmSync(itemPath, { recursive: true, force: true }); // Remove the item, including folders and contents
    }
};

module.exports = fileModel; // Export the file model for use in other parts of the application
