const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');
const User = require('../models/User');
const upload = require('../middlewares/uploadMiddleware');
const bcrypt = require('bcryptjs');

// Views
router.get('/register', (req, res) => res.render('register', { errors: [] }));
router.get('/login', (req, res) => res.render('login', { error: null }));
router.get('/dashboard', authMiddleware, (req, res) => res.render('dashboard'));
router.get('/logout', authController.logout);


router.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.render('profile', { user });
});


// Logic
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 chars long'),
  ],
  authController.register
);
router.post('/login', authController.login);

router.get('/edit-profile', authMiddleware, async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.render('edit-profile', { user, errors: [] });
});

router.post('/edit-profile',
  authMiddleware,
  upload.single('profilePic'),
  async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.id);

    // Update fields
    user.name = name;
    user.email = email;

    if (req.file) {
      user.profilePic = `/uploads/${req.file.filename}`;
    }

    await user.save();
    res.redirect('/profile');
  }
);

router.get('/change-password', authMiddleware, (req, res) => {
  res.render('change-password', { errors: [] });
});

router.post('/change-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.id);

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) {
    return res.render('change-password', { errors: ['Current password is incorrect'] });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.redirect('/dashboard');
});


module.exports = router;
