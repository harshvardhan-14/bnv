const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const upload = require('../config/multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'profiles');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Validation middleware
const userValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
  body('email')
    .trim()
    .isEmail().withMessage('Please provide a valid email address'),
  body('phoneNumber')
    .trim()
    .matches(/^\d{10}$/).withMessage('Phone number must be exactly 10 digits'),
  body('address')
    .trim()
    .notEmpty().withMessage('Address is required')
    .isLength({ min: 5 }).withMessage('Address must be at least 5 characters long'),
  body('city')
    .trim()
    .notEmpty().withMessage('City is required')
    .isLength({ min: 2 }).withMessage('City must be at least 2 characters long'),
  body('state')
    .trim()
    .notEmpty().withMessage('State is required')
    .isLength({ min: 2 }).withMessage('State must be at least 2 characters long'),
  body('zipCode')
    .trim()
    .matches(/^\d{5}(-\d{4})?$/).withMessage('Zip code must be valid (e.g., 12345 or 12345-6789)'),
  body('dateOfBirth')
    .notEmpty().withMessage('Date of birth is required')
    .isISO8601().withMessage('Date of birth must be a valid date')
    .custom((value) => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      if (age < 18) {
        throw new Error('User must be at least 18 years old');
      }
      return true;
    }),
  body('gender')
    .isIn(['Male', 'Female', 'Other']).withMessage('Please select a valid gender')
];

// Routes
router.get('/', userController.getAllUsers);
router.get('/search', userController.searchUsers);
router.get('/export/csv', userController.exportToCSV);
router.patch('/:id/status', userController.toggleUserStatus);
router.get('/:id', userController.getUserById);
router.post('/', upload.single('profile'), userValidation, userController.createUser);
router.put('/:id', upload.single('profile'), userValidation, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
