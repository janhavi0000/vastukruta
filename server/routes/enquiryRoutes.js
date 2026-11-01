const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats,
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');

// Public route for submitting project enquiry
router.post('/', createEnquiry);

// Protected routes for admin management
router.get('/stats', protect, getEnquiryStats);
router.get('/', protect, getEnquiries);
router.get('/:id', protect, getEnquiryById);
router.patch('/:id/status', protect, updateEnquiryStatus);
router.delete('/:id', protect, deleteEnquiry);

module.exports = router;
