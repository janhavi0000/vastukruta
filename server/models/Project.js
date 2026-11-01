const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Residential', 'Commercial', 'Interiors', 'Other'],
      default: 'Residential',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    year: {
      type: String,
      default: () => new Date().getFullYear().toString(),
      trim: true,
    },
    area: {
      type: String,
      trim: true,
      default: '',
    },
    client: {
      type: String,
      trim: true,
      default: 'Private Client',
    },
    status: {
      type: String,
      enum: ['Completed', 'Under Construction', 'Concept', 'Ongoing'],
      default: 'Completed',
    },
    shortDescription: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Detailed description is required'],
      trim: true,
    },
    specifications: [specificationSchema],
    coverImage: {
      type: String,
      required: [true, 'Cover image URL is required'],
      trim: true,
    },
    gallery: [
      {
        type: String,
        trim: true,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search & queries
projectSchema.index({ category: 1, published: 1, order: 1 });

module.exports = mongoose.model('Project', projectSchema);
