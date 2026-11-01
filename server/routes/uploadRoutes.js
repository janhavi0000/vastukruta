const express = require('express');
const router = express.Router();
const {
  uploadSingle,
  uploadMultiple,
  handleUpload,
  handleMultipleUpload,
} = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');

router.post('/single', protect, uploadSingle, handleUpload);
router.post('/multiple', protect, uploadMultiple, handleMultipleUpload);

module.exports = router;
