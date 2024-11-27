const fileModel = require('../models/fileModel');

const fileController = {
    getHomePage: (req, res) => {
        const currentDir = req.query.dir || '';
        const { folders, files } = fileModel.listItems(currentDir);

        res.render('index', { currentDir, folders, files });
    },

    createFolder: (req, res) => {
        const { folderName, currentDir } = req.body;
        fileModel.createFolder(currentDir, folderName);
        res.redirect(`/?dir=${currentDir}`);
    },

    uploadFile: (req, res) => {
        const currentDir = req.body.currentDir || '';
        res.redirect(`/?dir=${currentDir}`);
    },

    deleteItem: (req, res) => {
        const { itemName, currentDir } = req.body;
        fileModel.deleteItem(currentDir, itemName);
        res.redirect(`/?dir=${currentDir}`);
    }
};

module.exports = fileController;
