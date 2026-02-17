const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get all users with pagination
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    const pageNumber = Math.max(1, parseInt(page) || 1);
    const pageSize = Math.max(1, parseInt(limit) || 10);
    const skip = (pageNumber - 1) * pageSize;
    
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = { [sortBy]: sortOrder };
    
    const total = await User.countDocuments();
    const users = await User.find()
      .sort(sortObj)
      .skip(skip)
      .limit(pageSize);
    
    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        pages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors in createUser:', errors.array());
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

        // Prepare user data
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      dateOfBirth: new Date(req.body.dateOfBirth),
      gender: req.body.gender
    };
    
    // Handle file upload
    if (req.file) {
      userData.profilePicture = `/uploads/profiles/${req.file.filename}`;
    }
    
    // Check if email already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const user = new User(userData);
    await user.save();

    res.status(201).json({
      success: true,
      data: user,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if email is being updated and if it already exists
    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    const updateData = {
      ...req.body,
      dateOfBirth: new Date(req.body.dateOfBirth)
    };

    // Handle file upload
    if (req.file) {
      updateData.profilePicture = `/uploads/profiles/${req.file.filename}`;
      
      // Delete old profile picture if exists
      if (user.profilePicture) {
        const fs = require('fs');
        const path = require('path');
        const oldImagePath = path.join(__dirname, '..', 'public', user.profilePicture);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Delete profile picture if it exists
    if (user.profilePicture) {
      const fs = require('fs');
      const path = require('path');
      const imagePath = path.join(__dirname, '..', 'public', user.profilePicture);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the user
    await User.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Toggle user status
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Toggle status
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    user.status = newStatus;
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user,
      message: `User status changed to ${newStatus}`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Search users
exports.searchUsers = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const pageNumber = Math.max(1, parseInt(page) || 1);
    const pageSize = Math.max(1, parseInt(limit) || 10);
    const skip = (pageNumber - 1) * pageSize;
    
    const searchRegex = new RegExp(q, 'i');
    
    const total = await User.countDocuments({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { phoneNumber: searchRegex },
        { city: searchRegex }
      ]
    });
    
    const users = await User.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { phoneNumber: searchRegex },
        { city: searchRegex }
      ]
    })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        pages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Export users to CSV
exports.exportToCSV = async (req, res) => {
  try {
    const { Parser } = require('json2csv');
    
    const users = await User.find();
    
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found to export'
      });
    }
    
    const fields = ['_id', 'firstName', 'lastName', 'email', 'phoneNumber', 'address', 'city', 'state', 'zipCode', 'dateOfBirth', 'gender', 'profilePicture', 'createdAt', 'updatedAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(users);
    
    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename=users.csv');
    res.send(csv);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
