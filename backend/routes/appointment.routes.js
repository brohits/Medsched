const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment.model');
const { protect, restrictTo } = require('../middleware/auth.middleware');

// Create appointment
router.post('/', protect, async (req, res) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      patient: req.user._id
    });

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all appointments (admin only)
router.get('/all', protect, restrictTo('admin'), async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email')
      .populate('doctor', 'name email');

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user appointments
router.get('/my-appointments', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [
        { patient: req.user._id },
        { doctor: req.user._id }
      ]
    })
    .populate('patient', 'name email')
    .populate('doctor', 'name email');

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update appointment status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Only allow doctors, admin, or the patient to update status
    if (
      req.user.role !== 'admin' &&
      req.user._id.toString() !== appointment.doctor.toString() &&
      req.user._id.toString() !== appointment.patient.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete appointment
router.delete('/:id', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Only allow admin or the patient who created the appointment to delete it
    if (
      req.user.role !== 'admin' &&
      req.user._id.toString() !== appointment.patient.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this appointment' });
    }

    await appointment.remove();

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
