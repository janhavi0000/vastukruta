const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    studioName: {
      type: String,
      default: 'VASTUKRUTA',
      trim: true,
    },
    principalArchitect: {
      type: String,
      default: 'AR. PRANALI GHORPADE',
      trim: true,
    },
    tagline: {
      type: String,
      default: 'Spaces Designed with Purpose. Experiences Created with Care.',
      trim: true,
    },
    heroHeading: {
      type: String,
      default: 'Designing Spaces. Shaping Experiences.',
      trim: true,
    },
    heroSubtitle: {
      type: String,
      default: 'Thoughtful architecture and interiors crafted around the way you live, work and experience spaces.',
      trim: true,
    },
    phone: {
      type: String,
      default: '+91 98230 45678',
      trim: true,
    },
    email: {
      type: String,
      default: 'info@vastukruta.com',
      trim: true,
    },
    whatsapp: {
      type: String,
      default: '919823045678',
      trim: true,
    },
    address: {
      type: String,
      default: 'Studio Vastukruta, 4th Floor, Deccan Chamber, FC Road, Pune, Maharashtra 411004',
      trim: true,
    },
    mapEmbedUrl: {
      type: String,
      default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.0471115324!2d73.78056581457814!3d18.524598599547535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d3d3432!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
      trim: true,
    },
    instagram: {
      type: String,
      default: 'https://instagram.com/vastukruta.studio',
      trim: true,
    },
    linkedin: {
      type: String,
      default: 'https://linkedin.com/company/vastukruta-architects',
      trim: true,
    },
    architectBio: {
      type: String,
      default: 'Ar. Pranali Ghorpade is the founder and principal architect at Vastukruta. With a strong commitment to contextual architecture, climate-responsive design, and timeless aesthetic restraint, her practice creates living spaces that harmonize modern living with understated material honesty.',
      trim: true,
    },
    officeHours: {
      type: String,
      default: 'Mon - Sat: 10:00 AM - 7:00 PM (Sunday by Appointment)',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Setting', settingSchema);
