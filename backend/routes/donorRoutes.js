import express from 'express';
import multer from 'multer';
import path from 'path';
import Donor from '../models/Donor.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

// Get all donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.json(donors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get current user's donor profile
router.get('/my-profile', protect, async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user._id });
    res.json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create donor profile (only if user doesn't have one)
router.post('/', protect, upload.single('photo'), async (req, res) => {
  try {
    // Check if user already has a donor profile
    const existingDonor = await Donor.findOne({ userId: req.user._id });
    
    if (existingDonor) {
      return res.status(400).json({ 
        message: 'You have already registered as a donor. You can only edit your existing profile.' 
      });
    }

    const donorData = {
      ...req.body,
      userId: req.user._id,
      photo: req.file ? `/uploads/${req.file.filename}` : null
    };

    const donor = await Donor.create(donorData);
    res.status(201).json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update own donor profile
router.put('/my-profile', protect, upload.single('photo'), async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user._id });

    if (!donor) {
      return res.status(404).json({ message: 'Donor profile not found' });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`;
    }

    const updatedDonor = await Donor.findByIdAndUpdate(
      donor._id,
      updateData,
      { new: true }
    );

    res.json(updatedDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: Update any donor
router.put('/:id', protect, admin, upload.single('photo'), async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`;
    }

    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin: Delete donor
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Donor removed successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
