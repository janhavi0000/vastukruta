const Setting = require('../models/Setting');

// @desc    Get studio settings
// @route   GET /api/settings
// @access  Public
exports.getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({});
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve studio settings.',
      error: error.message,
    });
  }
};

// @desc    Update studio settings
// @route   PUT /api/settings
// @access  Private (Admin)
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(req.body);
    } else {
      settings = await Setting.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Studio settings updated successfully.',
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update settings.',
      error: error.message,
    });
  }
};
