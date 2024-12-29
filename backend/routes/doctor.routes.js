const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor.model');
const User = require('../models/user.model');
const { protect, restrictTo } = require('../middleware/auth.middleware');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate('user', 'name email phoneNumber');
    
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get doctor profile
router.get('/profile', protect, restrictTo('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user._id })
      .populate('user', 'name email phoneNumber');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create doctor profile (admin only)
router.post('/', protect, restrictTo('admin'), async (req, res) => {
  try {
    const doctor = await Doctor.create({
      user: req.body.userId,
      specialization: req.body.specialization,
      qualification: req.body.qualification,
      experience: req.body.experience,
      availability: req.body.availability,
      consultationFee: req.body.consultationFee
    });

    // Update user role to doctor
    await User.findByIdAndUpdate(req.body.userId, { role: 'doctor' });

    res.status(201).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update doctor profile
router.patch('/profile', protect, restrictTo('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email phoneNumber');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add review for doctor
router.post('/:id/reviews', protect, restrictTo('patient'), async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const review = {
      patient: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment
    };

    doctor.reviews.push(review);

    // Calculate average rating
    const totalRating = doctor.reviews.reduce((acc, item) => acc + item.rating, 0);
    doctor.rating = totalRating / doctor.reviews.length;

    await doctor.save();

    res.status(201).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'name email phoneNumber')
      .populate('reviews.patient', 'name');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
