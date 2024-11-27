const express = require('express');
const bodyParser = require('body-parser');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

// EJS ve Static Ayarlar
app.set('view engine', 'ejs');
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));

// Router Ekleme
app.use('/', fileRoutes);

// Sunucuyu Başlat
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
