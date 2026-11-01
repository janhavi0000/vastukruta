const Enquiry = require('../models/Enquiry');
const { sendEnquiryNotification } = require('../utils/mailer');

// @desc    Submit a new project enquiry
// @route   POST /api/enquiries
// @access  Public
exports.createEnquiry = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      projectType,
      location,
      approxArea,
      budget,
      description,
    } = req.body;

    // Validation
    if (!fullName || !phone || !email || !projectType || !location || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields: Name, Phone, Email, Project Type, Location, and Project Description.',
      });
    }

    // Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Phone format basic check
    if (phone.trim().length < 7) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone or mobile number.',
      });
    }

    const enquiry = await Enquiry.create({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      projectType,
      location: location.trim(),
      approxArea: approxArea ? approxArea.trim() : '',
      budget: budget ? budget.trim() : '',
      description: description.trim(),
      status: 'New',
    });

    // Asynchronously send notification (will not block client response)
    sendEnquiryNotification(enquiry).catch((err) => {
      console.error('[Notification Background Error]', err.message);
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Vastukruta. Ar. Pranali Ghorpade and our studio team will review your project brief and get in touch shortly.',
      referenceId: enquiry._id,
      data: {
        id: enquiry._id,
        fullName: enquiry.fullName,
        projectType: enquiry.projectType,
        createdAt: enquiry.createdAt,
      },
    });
  } catch (error) {
    console.error('[Enquiry Submission Error]', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry. Please try again or connect directly via WhatsApp.',
      error: error.message,
    });
  }
};

// @desc    Get all enquiries with filters
// @route   GET /api/enquiries
// @access  Private (Admin)
exports.getEnquiries = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { projectType: { $regex: search, $options: 'i' } },
      ];
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve enquiries.',
      error: error.message,
    });
  }
};

// @desc    Get enquiry by ID
// @route   GET /api/enquiries/:id
// @access  Private (Admin)
exports.getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry record not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve enquiry details.',
      error: error.message,
    });
  }
};

// @desc    Update enquiry status and admin notes
// @route   PATCH /api/enquiries/:id/status
// @access  Private (Admin)
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const validStatuses = ['New', 'Contacted', 'In Progress', 'Completed'];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Choose from: ${validStatuses.join(', ')}`,
      });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry record not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully.',
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update enquiry.',
      error: error.message,
    });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry record not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry.',
      error: error.message,
    });
  }
};

// @desc    Get dashboard metrics & stats
// @route   GET /api/enquiries/stats
// @access  Private (Admin)
exports.getEnquiryStats = async (req, res) => {
  try {
    const total = await Enquiry.countDocuments();
    const newCount = await Enquiry.countDocuments({ status: 'New' });
    const contacted = await Enquiry.countDocuments({ status: 'Contacted' });
    const inProgress = await Enquiry.countDocuments({ status: 'In Progress' });
    const completed = await Enquiry.countDocuments({ status: 'Completed' });

    const recent = await Enquiry.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      stats: {
        total,
        new: newCount,
        contacted,
        inProgress,
        completed,
      },
      recent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load enquiry stats.',
      error: error.message,
    });
  }
};
