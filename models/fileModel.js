const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '../uploads');

const fileModel = {
    listItems: (currentDir = '') => {
        const targetPath = path.join(BASE_DIR, currentDir);
        const items = fs.readdirSync(targetPath, { withFileTypes: true });

        const folders = items.filter(item => item.isDirectory()).map(item => item.name);
        const files = items.filter(item => item.isFile()).map(item => item.name);

        return { folders, files };
    },

    createFolder: (currentDir, folderName) => {
        const folderPath = path.join(BASE_DIR, currentDir, folderName);
        fs.mkdirSync(folderPath, { recursive: true });
    },

    deleteItem: (currentDir, itemName) => {
        const itemPath = path.join(BASE_DIR, currentDir, itemName);
        fs.rmSync(itemPath, { recursive: true, force: true });
    }
};

module.exports = fileModel;
