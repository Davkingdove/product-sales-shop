const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const User = require('./models/User');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Fix: Add this default route
const productController = require('./controllers/productController');
app.get('/', productController.getAllProducts);

app.use(authRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});
