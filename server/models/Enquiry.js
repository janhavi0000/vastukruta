const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    projectType: {
      type: String,
      required: [true, 'Project type is required'],
      enum: [
        'Architectural Design',
        'Residential Architecture',
        'Commercial Architecture',
        'Interior Design',
        'Building Planning and Layouts',
        'Renovation and Remodeling',
        '3D Visualization and Design Consultation',
        'Other',
      ],
      default: 'Residential Architecture',
    },
    location: {
      type: String,
      required: [true, 'Project location is required'],
      trim: true,
    },
    approxArea: {
      type: String,
      trim: true,
      default: '',
    },
    budget: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Completed'],
      default: 'New',
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

enquirySchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
