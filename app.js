const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const User = require('./models/User');


require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Fix: Add this default route
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use(authRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});
