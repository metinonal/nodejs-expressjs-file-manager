const express = require('express');
const multer = require('multer');
const path = require('path');
const fileController = require('../controllers/fileController');

const router = express.Router();

// Multer Konfigürasyonu
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const currentDir = req.body.currentDir || '';
        cb(null, `uploads/${currentDir}`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Rotalar
router.get('/download', (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.query.file || '');
    res.download(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('File not found or cannot be downloaded.');
        }
    });
});
router.get('/', fileController.getHomePage);
router.post('/create-folder', fileController.createFolder);
router.post('/upload', upload.single('file'), fileController.uploadFile);
router.post('/delete', fileController.deleteItem);

module.exports = router;
