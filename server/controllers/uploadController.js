const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `vastukruta_${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, WebP, AVIF) are supported!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Middleware helper
exports.uploadSingle = upload.single('image');
exports.uploadMultiple = upload.array('images', 10);

// Handler for single upload
exports.handleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please provide an image file to upload.',
    });
  }

  // Generate URL
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully.',
    url: fileUrl,
    filename: req.file.filename,
  });
};

// Handler for multiple uploads
exports.handleMultipleUpload = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please select at least one image file.',
    });
  }

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const urls = req.files.map((f) => `${baseUrl}/uploads/${f.filename}`);

  res.status(200).json({
    success: true,
    message: `${req.files.length} images uploaded successfully.`,
    urls,
  });
};
